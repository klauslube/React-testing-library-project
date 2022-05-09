import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemons = ['Pikachu', 'Charmander', 'Caterpie',
  'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

const filtersBtn = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

test('Teste o componente <Pokedex.js />', () => {
  renderWithRouter(<App />);

  const all = screen.getByRole('button', { name: 'All' });
  userEvent.click(all);
  expect(all).toBeInTheDocument();

  const encountered = screen.getByRole(
    'heading', { name: /encountered pokémons/i, level: 2 },
  );
  expect(encountered).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /próximo pokémon/i });
  pokemons.forEach((poke) => {
    const pokemon = screen.getByText(`${poke}`);
    expect(pokemon).toBeInTheDocument();
    userEvent.click(button);
  });

  const type = screen.getAllByTestId('pokemon-type-button');
  expect(type).toHaveLength(type.length);

  filtersBtn.forEach((filter) => {
    const typeBtn = screen.getByRole('button', { name: `${filter}` });
    expect(typeBtn).toBeInTheDocument();
  });
});
