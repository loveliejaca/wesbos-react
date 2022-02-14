import React from "react";
import { formatPrice } from "../helpers";

const Fish = props => {
  const { image, name, price, desc, status } = props.details;
  const isAvailable = status === "available";

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        disabled={!isAvailable}
        onClick={() => props.addToOrder(props.index)}
      >
        {isAvailable ? "Add To Order" : "Sold Out!"}
      </button>
    </li>
  )
}
export default Fish;
