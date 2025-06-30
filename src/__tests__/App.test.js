
import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
  test('renders list of events', () => {
    const { container } = render(<App />);
    const eventList = container.querySelector('#event-list');
    expect(eventList).toBeInTheDocument();
  });
})
