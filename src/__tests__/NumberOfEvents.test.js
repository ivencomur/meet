

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    // To render the component with a mock function for the prop it will need
    NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}} />);
  });

  test('renders a textbox for number of events', () => {
    const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextbox).toBeInTheDocument();
  });

  test('default value of the input field is 32', () => {
    const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextbox).toHaveValue("32");
  });

  test('value of input field changes when user types', async () => {
    const user = userEvent.setup();
    const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
  
    await user.clear(numberTextbox);
    await user.type(numberTextbox, "10");
    expect(numberTextbox).toHaveValue("10");
  });
});