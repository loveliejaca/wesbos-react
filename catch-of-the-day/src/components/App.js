import React, { useState, useEffect } from "react";
import firebase from "firebase";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory-class";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";


const App = (props) => {
  const { params } = props.match;

  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem(params.storeId)) || {});

  const addFish = (fish) =>  {
    setFishes({...fishes, [`fish${Date.now()}`]: fish });
  };

  const updateFish = (key, updatedFish) => {
    const updatedFishes = { ...fishes, [key]: updatedFish};
    setFishes(updatedFishes);

    base.post(`${params.storeId}/fishes`, {
      data: updatedFishes
    });
  };

  const deleteFish = (key) => {
    const updatedFishes = { ...fishes, [key]: null }
    setFishes(updatedFishes);

    base.post(`${params.storeId}/fishes`, {
      data: updatedFishes
    });
  }

  function loadSampleFishes() {
    setFishes({ ...fishes, ...sampleFishes });
    
    base.post(`${params.storeId}/fishes`, {
      data: { ...fishes, ...sampleFishes }
    });
  };

  const addToOrder = (key) => {
    setOrder({
      ...order,
      [key]: order[key] + 1 || 1
    })
  }

  const deleteOrder = (key) => {
    const orders = { ...order };
    delete orders[key];
    setOrder(orders);
  }

  useEffect(() => {
    const ref = base.syncState(`${params.storeId}/fishes`, {
      context: {
        setState: ({ fishes }) => setFishes({ ...fishes }),
        state: { fishes },
      },
      state: 'fishes'
    })

    return () => {
      base.removeBinding(ref);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(params.storeId, JSON.stringify(order));
  }, [order])

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="I am cool!!"/>
        <ul className="fishes">
          {
            Object.keys(fishes).map(key => (
              <Fish 
                key={key} 
                index={key} 
                details={fishes[key]} 
                addToOrder={addToOrder} 
              />
            ))
          }
        </ul>
      </div>
      <Order 
        fishes={fishes} 
        order={order} 
        deleteOrder={deleteOrder}
      />
      <Inventory
        addFish={addFish}
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
        storeId={params.storeId}
      />
    </div>
  )
}

export default App;
