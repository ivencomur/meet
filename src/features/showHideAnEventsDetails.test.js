import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppComponent;
  let AppDOM;

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the user is viewing the list of events', () => {
      AppComponent = render(<App />);
    });

    when('the user first sees an event', async () => {
      AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        within(AppDOM).queryAllByRole('listitem');
      });
    });

    then("the event's details should be hidden.", async () => {
      return waitFor(() => {
        const details = AppDOM.querySelector('.details');
        expect(details).not.toBeInTheDocument();
      });
    });
  });

  test('User can expand an event to see its details.', ({ given, when, then }) => {
    given('the user is viewing a collapsed event', async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      await waitFor(() => {
        within(AppDOM).queryAllByRole('listitem');
      });
    });

    when('the user clicks the "Show Details" button', async () => {
      const user = userEvent.setup();
      const showDetailsButton = within(AppDOM).queryAllByText('Show Details')[0];
      await user.click(showDetailsButton);
    });

    then("the event's details should become visible.", async () => {
      return waitFor(() => {
        const details = AppDOM.querySelector('.details');
        expect(details).toBeInTheDocument();
      });
    });
  });
});