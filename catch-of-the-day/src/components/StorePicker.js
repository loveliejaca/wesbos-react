import React, { useRef } from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

const StorePicker = props => {
  const myInput = useRef('');

  const goToStore = (e) => {
    e.preventDefault();
    const storeName = myInput.current.value;
    props.history.push(`/store/${storeName}`);
  }

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input
        type="text"
        ref={myInput}
        required
        placeholder="Store Name"
        defaultValue={getFunName()}
      />
      <button type="submit">Visit Store →</button>
    </form>
  );
}

StorePicker.propTypes = {
  history: PropTypes.object,
}


export default StorePicker;
