const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;


const redirect_uris = [
  "https://ivans-events.vercel.app", 
  "https://ivencomur.github.io",
  "http://localhost:3000" 
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0] 
);


const generateCorsHeaders = () => {
  return {
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Credentials": true,
  };
};

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: generateCorsHeaders(),
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  const code = decodeURIComponent(event.pathParameters.code);

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    return {
      statusCode: 200,
      headers: generateCorsHeaders(),
      body: JSON.stringify(tokens),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: generateCorsHeaders(),
      body: JSON.stringify(error),
    };
  }
};

module.exports.getCalendarEvents = async (event) => {
  const access_token = decodeURIComponent(event.pathParameters.access_token);
  oAuth2Client.setCredentials({ access_token });

  try {
    const { data } = await calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    return {
      statusCode: 200,
      headers: generateCorsHeaders(),
      body: JSON.stringify({ events: data.items }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: generateCorsHeaders(),
      body: JSON.stringify(error),
    };
  }
};
