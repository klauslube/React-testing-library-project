import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste o componente <Pokemon.js />', () => {
  const { history } = renderWithRouter(<App />);

  const pokemonName = screen.getByText('Pikachu');
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByText('Electric', { selector: 'p' });
  expect(pokemonType).toBeInTheDocument();

  const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i, { selector: 'p' });
  expect(pokemonWeight).toBeInTheDocument();

  const pokemonImage = screen.getByRole('img', { name: /Pikachu sprite/i });
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

  const detailsLink = screen.getByRole('link', { name: /More details/i });
  expect(detailsLink).toBeInTheDocument();

  userEvent.click(detailsLink);
  const label = screen.getByLabelText(/pokémon favoritado/i);
  userEvent.click(label);
  history.push('/');
  const starIcon = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
});
