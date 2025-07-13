    import { useState, useEffect } from 'react';
    import CitySearch from './components/CitySearch';
    import EventList from './components/EventList';
    import NumberOfEvents from './components/NumberOfEvents';
    import { getEvents, extractLocations } from './api';
    // ErrorAlert is imported:
    import { InfoAlert, ErrorAlert } from './components/Alert'; 

    import './App.css';

    function App() {
      const [events, setEvents] = useState([]);
      const [currentNOE, setCurrentNOE] = useState(32);
      const [allLocations, setAllLocations] = useState([]);
      const [currentCity, setCurrentCity] = useState("See all cities");
      const [infoAlert, setInfoAlert] = useState("");
      // New state for the error alert:
      const [errorAlert, setErrorAlert] = useState(""); 

      useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
          .alerts-container {
            position: fixed;
            top: 0px;
            left: 20px;
            width: 250px;
            z-index: 1000;
          }
        `;
        document.head.appendChild(style);
        return () => {
          document.head.removeChild(style);
        };
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          const allEvents = await getEvents();
          const eventsArray = Array.isArray(allEvents) ? allEvents : [];
          const filtered = currentCity === "See all cities" 
            ? eventsArray 
            : eventsArray.filter(event => event.location === currentCity);
          
          setEvents(filtered.slice(0, currentNOE));
          setAllLocations(extractLocations(eventsArray));
        };

        fetchData();
      }, [currentCity, currentNOE]);

      return (
        <div className="App">
          <div className="alerts-container">
            {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
            {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
          </div>

          <CitySearch 
            allLocations={allLocations} 
            setCurrentCity={setCurrentCity}
            setInfoAlert={setInfoAlert}
          />
          <NumberOfEvents 
            setCurrentNOE={setCurrentNOE}
            // New setter function to be passed:
            setErrorAlert={setErrorAlert} 
          />
          <EventList events={events} />
        </div>
      );
    }

    export default App;
    