import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import base, { firebaseApp } from "../base";


import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

const Inventory = props => {
  const [state, setState] = useState({
    uid: null,
    owner: null
  })

  const authHandler = async (authData) => {
    const store = await base.fetch(props.storeId, {});

    if (!store.owner) {
      await base.post(`${storeId}/owner`, { 
        data: authData.user.uid 
      })
    }
    
    setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  }

  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(data => authHandler(data, props.storeId));

    console.log(provider);
  };

  const handleLogout = async () => {
    await firebase.auth().signOut();

    setState({
      ...state,
      uid: null
    })
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authHandler({ user }, props.storeId)
      }
    })
  }, [])

  if (!uid) {
    return <Login authenticate={authenticate} />
  }

  if (uid !== owner) {
    return (
      <div>
        <p>Sorry you are not the owner!</p>
        <button onClick={handleLogout}>Log Out!</button>
      </div>
    )
  }

  return (
    <div className="inventory">
      
      <h2>Inventory</h2>
      <button onClick={handleLogout}>Log Out!</button>
      {
        Object.keys(props.fishes).map(key => (
          <EditFishForm 
            key={key} 
            index={key} 
            fish={props.fishes[key]} 
            updateFish={props.updateFish}
            deleteFish={props.deleteFish}
          />
        ))
      }
      <AddFishForm addFish={props.addFish} />
      <button onClick={props.loadSampleFishes}>
        Load Sample Fishes
      </button>
    </div>
  );
}

Inventory.propTypes = {
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func
}

export default Inventory;
