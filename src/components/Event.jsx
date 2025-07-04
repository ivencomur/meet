import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>

      {showDetails && (
        <div className="details">
          <h4>About the event:</h4>
          <p>{event.description}</p>
        </div>
      )}

      <button className="details-btn" onClick={handleToggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
    </li>
  );
};

export default Event;
