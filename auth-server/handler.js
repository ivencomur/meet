"use strict";

const { google } = require("googleapis");
const calendar = google.calendar("v3");

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

// credentials and calendar ID are loaded from environment variables
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = [
    "https://ivans-events.vercel.app"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);


module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};


module.exports.getAccessToken = async (event) => {
  try {
    
    const code = decodeURIComponent(event.queryStringParameters.code);

    const { tokens } = await oAuth2Client.getToken(code);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(tokens),
    };
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};


module.exports.getCalendarEvents = async (event) => {
  return new Promise((resolve, reject) => {
    
    const access_token = decodeURIComponent(event.pathParameters.access_token);
    oAuth2Client.setCredentials({ access_token });
    
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
  .then((results) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ events: response.data.items }),
    };
  })
  .catch((error) => {
    console.error("Error retrieving calendar events:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  });
};