import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { formatPrice } from "../helpers";


const Order = props => {
  const orderIds = Object.keys(props.order);
  const total = orderIds.reduce((prevTotal, key) => {
    const fish = props.fishes[key];
    const count = props.order[key];

    const isAvailable = fish && fish.status === "available";
    if (isAvailable) {
      return prevTotal + count * fish.price;
    }
    return prevTotal;
  }, 0);


  const renderOrder = key => {
    const fish = props.fishes[key];
    const count = props.order[key];
    const isAvailable = fish && fish.status === "available";
    
    const transitionOptions = {
      classNames: "order",
      timeout: { enter: 500, exit: 500 },
      key
    }

    if(!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition> 
      );
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>   
            lbs {fish.name}
            {formatPrice(count * fish.price)}

            <button onClick={() => props.deleteOrder(key)}>
              &times;
            </button>
          </span>
          
        </li>
      </CSSTransition> 
      
    );
  }

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup component="ul" className="order">
        {orderIds.map(renderOrder)}
      </TransitionGroup>
      <div className="total">
        Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>  
  )
}

Order.propTypes = {
  fishes: PropTypes.object,
  order: PropTypes.object,
  deleteOrder: PropTypes.func
}

export default Order;
