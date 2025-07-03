// auth-server/handler.js
"use strict";

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://ivans-events.vercel.app"];

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
    body: JSON.stringify({
      authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  return new Promise((resolve, reject) => {
    const code = decodeURIComponent(event.pathParameters.code);

    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
  .then((results) => {
    // FIX: This function should return the token object ('results'), not 'authUrl'.
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  })
  .catch((error) => {
    return {
      statusCode: 500,
      // FIX: Removed manual CORS headers to let API Gateway handle it.
      body: JSON.stringify(error),
    };
  });
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
    // FIX: This function should return the list of events, which are in results.data.items.
    return {
      statusCode: 200,
      body: JSON.stringify({ events: results.data.items }),
    };
  })
  .catch((error) => {
    return {
      statusCode: 500,
      // FIX: Removed manual CORS headers to let API Gateway handle it.
      body: JSON.stringify(error),
    };
  });
};