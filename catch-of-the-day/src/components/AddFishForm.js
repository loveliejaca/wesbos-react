import React, { useState } from "react";
import PropTypes from "prop-types";

const AddFishForm = props => {

  const [state, setState] = useState({
    name: '',
    price: '',
    status: 'available',
    desc: '',
    image: ''
  })

  const handleChange = (type, value) => {
    setState({
      ...state,
      [type]: value,
    });
  }

  const createFish = (e) => {
    e.preventDefault();
    props.addFish(state)
    e.currentTarget.reset();
  }

  return (
    <form className="fish-edit" onSubmit={createFish}>
        <input 
          name="name" 
          type="text" 
          placeholder="Name" 
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          name="price"
          type="text"
          placeholder="Price"
          onChange={(e) => handleChange("price", e.target.value)}
        />
        <select name="status" onChange={(e) => handleChange("status", e.target.value)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea name="desc" placeholder="Desc" onChange={(e) => handleChange("desc", e.target.value)}/>
        <input
          name="image"
          type="text"
          placeholder="Image"
          onChange={(e) => handleChange("image", e.target.value)}
        />
        <button type="submit">+ Add Fish</button>
      </form>
  )
}

AddFishForm.propTypes = {
  addFish: PropTypes.func
}

export default AddFishForm;
