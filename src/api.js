import mockData from './mock-data';

const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(      
      'https://gppssjeu5d5rud3pa4flehawri0cenhf.lambda-url.us-east-1.on.aws/' + encodeCode
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { access_token } = await response.json();
    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }
    return access_token;
  } catch (error) {
    console.error(error);
  }
};

const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =       
      "https://q2aqm4j7qrvl32zaxutpwhljmq0lucmr.lambda-url.us-east-1.on.aws/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
  return null;
};

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(        
        "https://hfdv4xdshp3lvsxv6ktelz2buy0slssn.lambda-url.us-east-1.on.aws/"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};