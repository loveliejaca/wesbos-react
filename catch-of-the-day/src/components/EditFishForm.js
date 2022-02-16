import React, { useState } from "react";
import PropTypes from "prop-types";

import { formatPrice } from "../helpers";

const EditFishForm = props => {
  const {name, price,status, desc, image} = props.fish;


  const handleChange = (e) => {
    const updatedFish = {
      ...props.fish,
      [e.target.name]: e.target.value
    }

    props.updateFish(props.index, updatedFish)
  }

  return (
    <div className="fish-edit">
      <input 
        name="name" 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={handleChange}
      />
      <input
        name="price"
        type="text"
        placeholder="Price"
        value={formatPrice(price)}
        onChange={handleChange}
      />
      <select 
        name="status"
        value={status}
        onChange={handleChange}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>

      <textarea 
        name="desc" 
        placeholder="Desc" 
        value={desc} 
        onChange={handleChange}
      />
      <input
        name="image"
        type="text"
        placeholder="Image"
        value={image} 
        onChange={handleChange}
      />

      <button onClick={() => props.deleteFish(props.index)}>Remove Fish</button>
    </div>
  );
}

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  }),
  index: PropTypes.string,
  updateFish: PropTypes.func
}

export default EditFishForm;
