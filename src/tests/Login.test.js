import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('test the Login component', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  it('should render the Login component properly', () => {
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDefined();
  });

  it('should redirect the application to /carteira', () => {
    userEvent.type(screen.getByTestId('email-input'), 'travis@scott.com');
    userEvent.type(screen.getByTestId('password-input'), 'highestintheroom');
    userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeDefined();
  });
});
