import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const TOTAL_FIELD = 'total-field';

const testIds = {
  valueInput: 'value-input',
  descriptionInput: 'description-input',
  currencyInput: 'currency-input',
  methodInput: 'method-input',
  tagInput: 'tag-input',
};

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockData),
}));

describe('test the Wallet component', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
  });

  it('should render the Wallet component properly', () => {
    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeDefined();
  });

  it('should add a new expense', async () => {
    userEvent.type(screen.getByTestId(testIds.valueInput), '14.33');
    userEvent.type(screen.getByTestId(testIds.descriptionInput), 'Uber');
    userEvent.selectOptions(screen.getByTestId(testIds.currencyInput), 'GBP');
    userEvent.selectOptions(screen.getByTestId(testIds.methodInput), 'Dinheiro');
    userEvent.selectOptions(screen.getByTestId(testIds.tagInput), 'Transporte');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(await screen
      .findByTestId(TOTAL_FIELD))
      .toHaveTextContent((14.33 * mockData.GBP.ask).toFixed(2));
  });

  it('should delete a expense', async () => {
    userEvent.type(screen.getByTestId(testIds.valueInput), '33.9');
    userEvent.type(screen.getByTestId(testIds.descriptionInput), 'iFood');
    userEvent.selectOptions(screen.getByTestId(testIds.currencyInput), 'JPY');
    userEvent.selectOptions(screen.getByTestId(testIds.methodInput), 'Cartão de débito');
    userEvent.selectOptions(screen.getByTestId(testIds.tagInput), 'Alimentação');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(await screen
      .findByTestId(TOTAL_FIELD))
      .toHaveTextContent((33.9 * mockData.JPY.ask).toFixed(2));

    userEvent.click(screen.getByRole('button', { name: /excluir/i }));

    expect(await screen.findByTestId(TOTAL_FIELD)).toHaveTextContent('0.00');
  });

  it('should edit a expense', async () => {
    userEvent.type(screen.getByTestId(testIds.valueInput), '67.1');
    userEvent.type(screen.getByTestId(testIds.descriptionInput), 'F1® Manager 2022');
    userEvent.selectOptions(screen.getByTestId(testIds.currencyInput), 'ARS');
    userEvent.selectOptions(screen.getByTestId(testIds.methodInput), 'Cartão de crédito');
    userEvent.selectOptions(screen.getByTestId(testIds.tagInput), 'Lazer');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    expect(await screen
      .findByTestId(TOTAL_FIELD))
      .toHaveTextContent((67.1 * mockData.ARS.ask).toFixed(2));

    userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));
    userEvent.type(screen.getByTestId(testIds.valueInput), '67.1');
    userEvent.type(screen.getByTestId(testIds.descriptionInput), 'F1® Manager 2022');
    userEvent.selectOptions(screen.getByTestId(testIds.currencyInput), 'CNY');
    userEvent.selectOptions(screen.getByTestId(testIds.methodInput), 'Cartão de débito');
    userEvent.selectOptions(screen.getByTestId(testIds.tagInput), 'Lazer');
    userEvent.click(screen.getAllByTestId('edit-btn')[0]);

    expect(await screen
      .findByTestId(TOTAL_FIELD))
      .toHaveTextContent((67.1 * mockData.CNY.ask).toFixed(2));
  });
});
