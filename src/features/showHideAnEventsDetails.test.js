// src/features/showHideAnEventsDetails.test.js

import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  // Scenario 1
  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;
    given('the user is viewing the list of events', () => {
      AppComponent = render(<App />);
    });

    when('the user first sees an event', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    then('the event\'s details should be hidden.', () => {
      const AppDOM = AppComponent.container.firstChild;
      const details = AppDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });
  });

  // Scenario 2
  test('User can expand an event to see its details.', ({ given, when, then }) => {
    let AppComponent;
    given('the user is viewing a collapsed event', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    when('the user clicks the "Show Details" button', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      const showDetailsButton = within(AppDOM).queryAllByText('Show Details')[0];
      await user.click(showDetailsButton);
    });

    then('the event\'s details should become visible.', () => {
      const AppDOM = AppComponent.container.firstChild;
      const details = AppDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });
  });
});