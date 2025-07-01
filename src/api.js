import mockData from "./mock-data";

/**
 @param {*} events:
 // To take an event(s) array, then, use maps to create a new array with locations, only.
 //Also, remove duplicates when creating a new array
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const getEvents = async () => {
  return mockData;
};
