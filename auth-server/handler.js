"use strict";

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ["https://ivans-events.vercel.app"];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

async function getAuthURL() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  let message = "deploy on sunday";
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
      message,
    }),
  };
}

async function getCalendarEvents() {
  console.log("get calendar events was called");
  let message = "called calendar events"
  let calendar_events = []
  try {
    
      //TODO: call google api to retreive calend events
  } catch (error) {
    console.error("Error retriving calendar events")
  }
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      message,
      calendar_events
    }),
  };
}

//make functions able to be called
module.exports = {
  getAuthURL,
  getCalendarEvents,
};
