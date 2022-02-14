import React, { useRef } from "react";
import { getFunName } from "../helpers";

const StorePicker = props => {
  const myInput = useRef('');

  function goToStore(e) {
    // 1. Stop the form from submitting
    e.preventDefault();
    // 2. get the text from that input
    const storeName = myInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
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

export default StorePicker;
