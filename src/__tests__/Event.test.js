

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
}); 