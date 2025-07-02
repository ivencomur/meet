# Meet App

## Project Description

A serverless web application built with React that allows users to find upcoming web development events in various cities. The app fetches data from the Google Calendar API and was built using a Test-Driven Development (TDD) approach.

## Key Features

* **Filter Events by City:** Users can search for a city to see relevant events, with suggestions provided as the user types.
* **Show/Hide Event Details:** Each event can be expanded to show more details or collapsed to hide them.
* **Specify Number of Events:** Users can specify the number of events to be displayed at once, with a default of 32.

## Technologies Used

* **Frontend:** React, Vite
* **Testing:** Jest, React Testing Library
* **Backend:** Serverless Functions (AWS Lambda)
* **API:** Google Calendar API (with OAuth2)

---

## User Stories Implemented

* **Feature 1: Filter Events By City**
    > As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

* **Feature 2: Show/Hide Event Details**
    > As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

* **Feature 3: Specify Number of Events**
    > As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

---

## Local Development Setup

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Run tests:**
    ```bash
    npm run test
    ```