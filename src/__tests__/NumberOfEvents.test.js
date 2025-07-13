import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents 
        setCurrentNOE={() => {}} 
        setErrorAlert={() => {}} 
      />
    );
  });

  test('renders number input', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
  });

  test('default value of the input field is 32', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toHaveValue("32");
  });

  test('value of input field changes when user types', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(numberTextBox, "{backspace}{backspace}10");
    expect(numberTextBox).toHaveValue("10");
  });
});
