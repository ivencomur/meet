const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

// The redirect URI must be authorized in the Google Console for your project.
const redirect_uris = [
  "https://ivencomur.github.io/meet/"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0] // Note: Using the first URI by default
);

// --- Function to add CORS headers ---
// Creating a helper function to avoid repeating the headers in every function.
const generateCorsHeaders = () => {
  return {
    "Access-Control-Allow-Origin": "*", // This should allow any origin to access
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
    headers: generateCorsHeaders(), // <-- Headers should be added here
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
      headers: generateCorsHeaders(), // <-- headers here
      body: JSON.stringify(tokens),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: generateCorsHeaders(), // <-- headers even on error
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
      headers: generateCorsHeaders(), // <-- Add headers here
      body: JSON.stringify({ events: data.items }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: generateCorsHeaders(), // <-- Add headers even on error
      body: JSON.stringify(error),
    };
  }
};
