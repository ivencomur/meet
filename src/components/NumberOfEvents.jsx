
import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [number, setNumber] = useState(32);

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (isNaN(value) || value < 0) {
      setNumber(0); 
      setCurrentNOE(0);
    } else {
      setNumber(value);
      setCurrentNOE(value);
    }
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