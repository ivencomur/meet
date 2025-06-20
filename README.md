Meet App - A PWA Event Finder
Project Description
The Meet App is a serverless, progressive web application (PWA) built with React. It allows users to find upcoming events in various cities by utilizing the Google Calendar API. The app is developed using a test-driven development (TDD) approach and features offline capabilities, installability, and data visualizations.

Key Technologies
Framework: React

Build Tool: Vite

Development Methodology: Test-Driven Development (TDD) & Behavior-Driven Development (BDD)

API: Google Calendar API (with OAuth2)

Backend: Serverless Functions (AWS Lambda)

Platform Features: Progressive Web App (PWA)

Data Visualization: Recharts (Scatterplot and Pie Chart)

User Stories
Feature 1: Filter Events By City
As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city.

Feature 2: Show/Hide Event Details
As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

Feature 3: Specify Number of Events
As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

Feature 4: Use the App When Offline
As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

Feature 5: Add an App Shortcut to the Home Screen
As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

Feature 6: Display Charts Visualizing Event Details
As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

Test Scenarios (Gherkin)
Feature 1: Filter Events By City
Scenario 1: Given the user has not searched for any city, When the user opens the app, Then the user should see a list of upcoming events from all cities.

Scenario 2: Given the main page is open, When the user starts typing in the city textbox, Then the user should receive a list of city suggestions that match the typed input.

Scenario 3: Given the user was typing "Berlin" in the city textbox AND the list of suggested cities is showing, When the user selects a city (e.g., "Berlin, Germany") from the list, Then their city filter should be changed to "Berlin, Germany" AND the user should receive a list of upcoming events in "Berlin, Germany".

Feature 2: Show/Hide Event Details
Scenario 1: Given an event is displayed in the list, When the user views the event element, Then the event's details section should be collapsed by default.

Scenario 2: Given an event's details section is collapsed, When the user clicks on the "Show details" button for that event, Then the event's details section should expand to display its details.
