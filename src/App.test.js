import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './componentes/Footer';

test('el footer muestra el nombre del desarrollador', () => {
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  expect(screen.getByText(/Andrew Tanenbaum/)).toBeInTheDocument();
});
