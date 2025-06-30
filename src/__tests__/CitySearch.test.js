import { render } from '@testing-library/react';
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    const { getByRole } = render(<CitySearch />);
    const cityTextBox = getByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
  });
});