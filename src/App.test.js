import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('muestra el nombre del desarrollador en el inicio', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: 'Andrew Tanenbaum' })).toBeInTheDocument();
});
