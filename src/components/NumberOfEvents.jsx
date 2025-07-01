
import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  // Initialize state to hold a default number of to 32
  const [number, setNumber] = useState(32);

  // To handle changes to the input field
  const handleInputChange = (event) => {
    const value = event.target.value;
    setNumber(value);
    // To Call the function passed down from App.jsx to update the state there
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-input">Number of Events: </label>
      <input
        id="number-input"
        type="text"
        className="number-input"
        value={number}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;