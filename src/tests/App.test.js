import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  const { history } = renderWithRouter(<App />);
  let { pathname } = history.location;

  const homeTitle = screen.getByRole('link', { name: /home/i });
  expect(homeTitle).toBeInTheDocument();
  userEvent.click(homeTitle);
  expect(pathname).toBe('/');
  // history.push()

  const aboutTitle = screen.getByRole('link', { name: /about/i });
  expect(aboutTitle).toBeInTheDocument();
  userEvent.click(aboutTitle);
  // console.log(history);
  pathname = history.location.pathname;
  expect(pathname).toBe('/about');

  const favoriteTitle = screen.getByRole('link', { name: /favorite pokémons/i });
  expect(favoriteTitle).toBeInTheDocument();
  userEvent.click(favoriteTitle);
  pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página Not Found', () => {
  const { history, debug } = renderWithRouter(<App />);

  history.push('/notFound/');
  debug();
  const notFoundTitle = screen.getByRole('heading',
    { name: /Page requested not found/i, level: 2 });
  expect(notFoundTitle).toBeInTheDocument();

  const notFoundImg = screen.getByAltText(
    /Pikachu crying because the page requested was not found/i,
  );
  expect(notFoundImg).toBeInTheDocument();
});
