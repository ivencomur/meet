    import mockData from './mock-data';

    const removeQuery = () => {
      if (window.history.pushState && window.location.pathname) {
        const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState("", "", newurl);
      }
    };

    const getToken = async (code) => {
      try {
        const encodeCode = encodeURIComponent(code);
        const response = await fetch(
          'https://tllamx3mtc.execute-api.us-east-1.amazonaws.com/dev/api/token/' + encodeCode
        );
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

    const checkToken = async (accessToken) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
      } catch (error) {
          console.error("Failed to check token:", error);
          return { error: "Failed to validate token" };
      }
    };

    export const getAccessToken = async () => {
      const accessToken = localStorage.getItem('access_token');
      const tokenCheck = accessToken ? await checkToken(accessToken) : { error: "No token found" };

      if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        if (!code) {
          try {
            const response = await fetch("https://tllamx3mtc.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url");
            const result = await response.json();
            const { authUrl } = result;
            window.location.href = authUrl;
            return null;
          } catch (error) {
            console.error("Failed to fetch auth URL:", error);
            return null;
          }
        }
        return code ? getToken(code) : null;
      }
      return accessToken;
    };

    export const getEvents = async () => {
      if (window.location.href.startsWith("http://localhost")) {
        return mockData;
      }

      if (!navigator.onLine) {
        const events = localStorage.getItem("lastEvents");
        return events ? JSON.parse(events) : [];
      }

      const token = await getAccessToken();

      if (token) {
        removeQuery();
        const url = "https://tllamx3mtc.execute-api.us-east-1.amazonaws.com/dev/api/get-calendar-events/" + token;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
          localStorage.setItem("lastEvents", JSON.stringify(result.events));
          return result.events;
        } else return null;
      }
      return null;
    };

    export const extractLocations = (events) => {
      if (!events || events.length === 0) return [];
      const extractedLocations = events.map((event) => event.location);
      const locations = [...new Set(extractedLocations)];
      return locations;
    };
    