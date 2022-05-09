import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste o componente <NotFound.js />', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/notFound/');

  const notFoundTitle = screen.getByRole('heading',
    { name: /Page requested not found/i, level: 2 });
  expect(notFoundTitle).toBeInTheDocument();

  const notFoundImg = screen.getByAltText(
    /Pikachu crying because the page requested was not found/i,
  );
  expect(notFoundImg).toBeInTheDocument();
  expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
