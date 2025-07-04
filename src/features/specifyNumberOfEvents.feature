
Feature: Specify Number of Events

  As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.

  Scenario: When user hasn’t specified a number, 32 events are shown by default.
    Given the user has opened the app
    When the event list is displayed
    Then the default number of events shown should be 32.

  Scenario: User can change the number of events they want to see.
    Given the user is viewing the list of events
    When the user specifies a new number of events to display
    Then the event list should be updated to show that number of events.