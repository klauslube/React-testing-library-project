import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste o componente Favorite Pokemons', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/favorites');
  const message = screen.getByText(/no favorite pokemon found/i, { selector: 'p' });
  expect(message).toBeInTheDocument();

  history.push('/');
  const details = screen.getByRole('link', { name: /More details/i });
  userEvent.click(details);
  const label = screen.getByLabelText(/pokémon favoritado/i);
  userEvent.click(label);

  history.push('/favorites');
  const favorite = screen.getByText(/pikachu/i);
  expect(favorite).toBeInTheDocument();
});
