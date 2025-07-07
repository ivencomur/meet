import mockData from './mock-data';

const apiUrl = 'https://tllamx3mtc.execute-api.us-east-1.amazonaws.com/dev/api';


const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState("", "", newurl);
  }
};

 @param {string} code The authorization code from the URL.
 @returns {string} The access token.
 
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(`${apiUrl}/token/${encodeCode}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { access_token } = await response.json();
    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }
    return access_token;
  } catch (error) {
    console.error("Failed to get token:", error);
    return null;
  }
};


 @param {string} accessToken The access token to validate.
@returns {object} The result from the Google token info endpoint.

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};


 @returns {Array|null} An array of events or null.
 
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();
  if (token) {
    removeQuery();
    const url = `${apiUrl}/get-calendar-events/${token}`;
    const response = await fetch(url);
    const result = await response.json();
    return result ? result.events : null;
  }
  return null;
};
 @returns {string|null} The access token.
 
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    if (!code) {
      const response = await fetch(`${apiUrl}/get-auth-url`);
      const result = await response.json();
      const { authUrl } = result;
      
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

 @param {Array} events The list of events.
 @returns {Array} A list of unique location strings.
 
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
 
  const locations = [...new Set(extractedLocations)];
  return locations;
};