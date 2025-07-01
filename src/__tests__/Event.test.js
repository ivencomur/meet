
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
  const testEvent = mockData[0];

  test('renders the event title', () => {
    const { getByText } = render(<Event event={testEvent} />);
    expect(getByText(testEvent.summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    const { getByText } = render(<Event event={testEvent} />);
    expect(getByText(testEvent.created)).toBeInTheDocument();
  });

  test('renders event location', () => {
    const { getByText } = render(<Event event={testEvent} />);
    expect(getByText(testEvent.location)).toBeInTheDocument();
  });

   test('renders event details button with the title "Show Details"', () => {
    const { getByText } = render(<Event event={testEvent} />);
    expect(getByText('Show Details')).toBeInTheDocument();
  });

   test('by default, event details are hidden', () => {
    const { container } = render(<Event event={testEvent} />);
    //  query for an element with the class 'details'. It shouldn't be there.
    const detailsElement = container.querySelector('.details');
    expect(detailsElement).not.toBeInTheDocument();
  });

   test('reveals event details when user clicks "Show Details" button', async () => {
    const user = userEvent.setup();
    const { container, getByText } = render(<Event event={testEvent} />);

    // The button shouldis supposed toi exist and details be hidden initially
    const showDetailsButton = getByText('Show Details');
    expect(container.querySelector('.details')).not.toBeInTheDocument();

    // Simulate user clicking the button
    await user.click(showDetailsButton);

    // Assert that the details are now visible
    const detailsElement = container.querySelector('.details');
    expect(detailsElement).toBeInTheDocument();
  });
}); 