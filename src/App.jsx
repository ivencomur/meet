import { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      // Ensure allEvents is an array before using it.
      const eventsArray = Array.isArray(allEvents) ? allEvents : [];
      const filtered = currentCity === "See all cities" 
        ? eventsArray 
        : eventsArray.filter(event => event.location === currentCity);
      
      setEvents(filtered);
      setAllLocations(extractLocations(eventsArray));
    };

    fetchData();
  }, [currentCity]);
  
  // This useEffect will now safely handle the events array.
  useEffect(() => {
    const slicedEvents = Array.isArray(events) ? events.slice(0, currentNOE) : [];
    setFilteredEvents(slicedEvents);
  }, [events, currentNOE]);


  return (
    <div className="App">
      <h1>Meet App</h1>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={filteredEvents} />
    </div>
  );
}

export default App;
