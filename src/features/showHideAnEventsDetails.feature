Feature: Show/Hide Event Details

  As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

  Scenario: An event element is collapsed by default.
    Given the user is viewing the list of events
    When the user first sees an event
    Then the event's details should be hidden.

  Scenario: User can expand an event to see its details.
    Given the user is viewing a collapsed event
    When the user clicks the "Show Details" button
    Then the event's details should become visible.