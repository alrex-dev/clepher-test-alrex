import { render, screen } from '@testing-library/react';
import ListItem from '../../ListItem';

const item = {
    "1. open": "Test",
    "2. high": "Test"
}

test('renders item data', () => {
  render(<ListItem key={1} item={item} idx={2} />);
  const el = screen.getByText(/Open/i);
  expect(el).toBeInTheDocument();
});
