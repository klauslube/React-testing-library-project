import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('teste o componente About', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const aboutPokedex = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(aboutPokedex).toBeInTheDocument();

  const info = screen.getByText(/This application simulates/i, { selector: 'p' });
  expect(info).toBeInTheDocument();

  const info2 = screen.getByText(/One can filter Pokémons by type/i, { selector: 'p' });
  expect(info2).toBeInTheDocument();

  const img = screen.getByRole('img', { name: /pokédex/i });
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
