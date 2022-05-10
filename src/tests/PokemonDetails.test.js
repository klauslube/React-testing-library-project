import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste o componente <PokemonDetails.js />', () => {
  renderWithRouter(<App />);
  const DetailsLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(DetailsLink);
  expect(DetailsLink).not.toBeInTheDocument();

  const pokemonDetail = screen.getByRole(
    'heading', { name: /details/i, level: 2 },
  );
  expect(pokemonDetail).toBeInTheDocument();

  const pokemonSummary = screen.getByRole(
    'heading', { name: /Summary/i, level: 2 },
  );
  expect(pokemonSummary).toBeInTheDocument();

  const pokemonInfo = screen.getByText(/This intelligent Pokémon /i, { selector: 'p' });
  expect(pokemonInfo).toBeInTheDocument();

  const pokemonLocation = screen.getByRole(
    'heading', { name: /Game Locations of /i, level: 2 },
  );
  expect(pokemonLocation).toBeInTheDocument();

  const location = screen.getByText(/Kanto Viridian Forest/i, { selector: 'em' });
  expect(location).toBeInTheDocument();
  const locationTwo = screen.getByText(/Kanto Power Plant/i, { selector: 'em' });
  expect(locationTwo).toBeInTheDocument();

  const locationImg = screen.getAllByRole('img', { name: /Pikachu location/i });
  expect(locationImg).toHaveLength(2);
  expect(locationImg[0]).toBeInTheDocument();
  expect(locationImg[1]).toBeInTheDocument();
  expect(locationImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locationImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

  const label = screen.getByLabelText(/pokémon favoritado/i);
  expect(label).toBeInTheDocument();
  userEvent.click(label);

  const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(favoriteLink);

  const checkFavorite = screen.getAllByText(/average weight/i, { selector: 'p' });
  expect(checkFavorite).toHaveLength(1);

  const backLinkDetail = screen.getByRole('link', { name: /more details/i });
  userEvent.click(backLinkDetail);

  const labelTwo = screen.getByLabelText(/pokémon favoritado/i);
  userEvent.click(labelTwo);
  const favoriteLinkTwo = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(favoriteLinkTwo);

  const checkFavoriteAgain = screen.getByText(/no favorite/i, { selector: 'p' });
  expect(checkFavoriteAgain).toBeInTheDocument();
});
