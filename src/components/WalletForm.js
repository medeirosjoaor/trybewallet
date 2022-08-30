import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { setCurrenciesThunk, setExpense } from '../redux/actions/index';
import fetchCurrencies from '../helpers/fetchCurrencies';
import paymentMethods from '../helpers/paymentMethods';
import tags from '../helpers/tags';

function WalletForm({ currencies, dispatch }) {
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

  return (
    <section>
      <form onSubmit={ handleSubmit }>
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
        <button type="submit">Adicionar despesa</button>
      </form>
    </section>
  );
}

const mapStateToProps = ({ wallet: { currencies } }) => ({ currencies });

WalletForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.shape).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
