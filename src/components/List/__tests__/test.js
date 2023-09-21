import { render, screen } from '@testing-library/react';
import List from '../../List';

test('renders list', () => {
  render(<List />);
  //const el = screen.getByText(/Open/i);
  //expect(el).toBeInTheDocument();
});
