    import { useState } from "react";

    const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
      const [number, setNumber] = useState(32);

      const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumber(value);

        let errorText;
        if (isNaN(value) || value <= 0) {
          errorText = "Please enter a valid positive number.";
        } else {
          errorText = "";
          setCurrentNOE(value);
        }
        setErrorAlert(errorText);
      };

      return (
        <div id="number-of-events">
          <label htmlFor="number-input">Number of Events: </label>
          <input
            id="number-input"
            type="text"
            className="number-input"
            value={number}
            onChange={handleInputChanged}
          />
        </div>
      );
    };

    export default NumberOfEvents;
    