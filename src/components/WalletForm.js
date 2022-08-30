import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  setCurrenciesThunk,
  setExpense,
  deleteExpense,
  setIdToEdit,
} from '../redux/actions/index';
import fetchCurrencies from '../helpers/fetchCurrencies';
import paymentMethods from '../helpers/paymentMethods';
import tags from '../helpers/tags';

function WalletForm({ currencies, dispatch, editor, expenses, idToEdit }) {
  useEffect(() => dispatch(setCurrenciesThunk()), [dispatch]);

  const [id, incrementId] = useState(0);

  const INITIAL_STATE = {
    price: '',
    description: '',
    currency: 'USD',
    paymentMethod: 'Cartão de crédito',
    tag: 'Alimentação',
  };

  const [{
    price,
    description,
    currency,
    paymentMethod,
    tag,
  }, setState] = useState(INITIAL_STATE);

  const handleChange = ({ target: { name, value } }) => {
    setState((previousState) => ({ ...previousState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const object = await fetchCurrencies();

    delete object.USDT;

    dispatch(setExpense({
      id,
      value: price,
      currency,
      method: paymentMethod,
      tag,
      description,
      exchangeRates: object,
    }));

    incrementId(id + 1);
    setState({ ...INITIAL_STATE });
  };

  const handleClick = () => {
    const object = expenses.find((expense) => expense.id === idToEdit);

    dispatch(deleteExpense(idToEdit));
    dispatch(setExpense({
      ...object,
      id: idToEdit,
      value: price,
      currency,
      method: paymentMethod,
      tag,
      description,
    }));
    dispatch(setIdToEdit(Date.now(), false));
    setState({ ...INITIAL_STATE });
  };

  const handleEditing = () => {
    if (editor) {
      return (
        <button
          data-testid="edit-btn"
          onClick={ handleClick }
          type="button"
        >
          Editar despesa
        </button>
      );
    }

    return <button onClick={ handleSubmit } type="submit">Adicionar despesa</button>;
  };

  return (
    <section>
      <input
        data-testid="value-input"
        name="price"
        onChange={ handleChange }
        type="text"
        value={ price }
      />
      <input
        data-testid="description-input"
        name="description"
        onChange={ handleChange }
        type="text"
        value={ description }
      />
      <select
        data-testid="currency-input"
        name="currency"
        onChange={ handleChange }
        value={ currency }
      >
        {currencies.map((element) => (
          <option label={ element } key={ element }>{element}</option>
        ))}
      </select>
      <select
        data-testid="method-input"
        name="paymentMethod"
        onChange={ handleChange }
        value={ paymentMethod }
      >
        {paymentMethods.map((element) => (
          <option label={ element } key={ element }>{element}</option>
        ))}
      </select>
      <select
        data-testid="tag-input"
        name="tag"
        onChange={ handleChange }
        value={ tag }
      >
        {tags.map((element) => (
          <option label={ element } key={ element }>{element}</option>
        ))}
      </select>
      {handleEditing()}
    </section>
  );
}

const mapStateToProps = ({
  wallet: {
    currencies,
    editor,
    expenses,
    idToEdit,
  },
}) => ({ currencies, editor, expenses, idToEdit });

WalletForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.shape).isRequired,
  dispatch: propTypes.func.isRequired,
  editor: propTypes.bool.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
  idToEdit: propTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
