import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  // Scenario 1
  test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
    let AppComponent;
    given('the user has opened the app', () => {
      AppComponent = render(<App />);
    });

    when('the event list is displayed', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    then('the default number of events shown should be 32.', () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventList = within(AppDOM).queryAllByRole('listitem');
      expect(eventList.length).toEqual(32);
    });
  });

  // Scenario 2
  test('User can change the number of events they want to see.', ({ given, when, then }) => {
    let AppComponent;
    given('the user is viewing the list of events', () => {
      AppComponent = render(<App />);
    });

    when('the user specifies a new number of events to display', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
      const numberInput = within(NumberOfEventsDOM).queryByRole('textbox');
      await user.clear(numberInput);
      await user.type(numberInput, '10');
    });

    then('the event list should be updated to show that number of events.', async () => {
      const AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList.length).toEqual(10);
      });
    });
  });
});