import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title in landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to VIDEOGAMES/i);
  expect(linkElement).toBeInTheDocument();
});
