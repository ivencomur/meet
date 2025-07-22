import { Component } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { getEvents, extractLocations } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentCity: 'See all cities',
    currentNOE: 32,
    infoAlert: '',
    errorAlert: '',
    warningAlert: '',
  };

  componentDidMount() {
    this.fetchData();
    window.addEventListener('online', this.checkOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.checkOnlineStatus);
  }

  checkOnlineStatus = () => {
    if (navigator.onLine) {
      this.setState({ warningAlert: '' });
    } else {
      this.setState({ warningAlert: 'You are offline! The displayed data may be from your last online session.' });
    }
    this.fetchData();
  };

  fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      this.state.currentCity === 'See all cities'
        ? allEvents
        : allEvents.filter((event) => event.location === this.state.currentCity);
    this.setState({
      events: filteredEvents.slice(0, this.state.currentNOE),
      locations: extractLocations(allEvents),
    });

    if (!navigator.onLine) {
      this.setState({ warningAlert: 'You are offline! The displayed data may be from your last online session.' });
    } else {
      this.setState({ warningAlert: '' });
    }
  };

  setCurrentCity = (city) => {
    this.setState({ currentCity: city }, this.fetchData);
  };

  setCurrentNOE = (number) => {
    this.setState({ currentNOE: number }, this.fetchData);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { events, locations, currentNOE, infoAlert, errorAlert, warningAlert } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        {infoAlert && <InfoAlert text={infoAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
        {warningAlert && <WarningAlert text={warningAlert} />}

        <CitySearch
          allLocations={locations}
          setCurrentCity={this.setCurrentCity}
          setInfoAlert={(text) => this.setState({ infoAlert: text })}
        />
        <NumberOfEvents
          setCurrentNOE={this.setCurrentNOE}
          setErrorAlert={(text) => this.setState({ errorAlert: text })}
        />

        <div className="charts-container">
          <CityEventsChart allLocations={locations} events={events} />
          <EventGenresChart events={events} />
        </div>

        <EventList events={events} />
      </div>
    );
  }
}

export default App;