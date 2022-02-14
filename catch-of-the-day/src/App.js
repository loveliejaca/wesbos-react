import React, { useState, useEffect } from 'react';

import fishes from './sample-fishes';
import Header from './components/Header';
import Order from './components/Order';
import Inventory from './components/Inventory';
import Fish from './components/Fish';
import base from './base';

const App = (props) => {
  let [state, setState] = useState({
    fishes: {},
    order: {}
  });

  const [stateFishes, setStateFishes] = useState({});

  const params = props.match.params;

  useEffect(() => {
    const ref = base.syncState(`${params.storeId}/fishes`, {
      context: {
        setStateFishes: ({fishes}) => setStateFishes({ ...fishes })
      },
      state: 'fishes'
    })

    console.log('ref', ref);

    return () => {
      base.removeBinding(ref);
    }
  }, [])

  function addFish(fish) {
    const cloneFishes = { ...state.cloneFishes };

    cloneFishes[`fish${Date.now()}`] = fish;
    setState({ ...state, cloneFishes });
    setStateFishes({...cloneFishes});
  };

  function loadSampleFishes() {
    setState({ ...state, fishes });
    setStateFishes({...fishes});
  };

  function addToOrder(key) {
    const order = { ...state.order };
    order[key] = order[key] + 1 || 1;

    setState({ ...state, order });
  }

  

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="I am cool!!"/>
        <ul className="fishes">
          {
            Object.keys(state.fishes).map(key => (
              <Fish 
                key={key} 
                index={key} 
                details={state.fishes[key]} 
                addToOrder={addToOrder} 
              />
            ))
          }
        </ul>
      </div>
      <Order 
        fishes={state.fishes} 
        order={state.order}
      />
      <Inventory 
        addFish={addFish} 
        loadSampleFishes={loadSampleFishes}
      />
    </div>
  )
}

export default App;