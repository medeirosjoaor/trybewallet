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
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [currency, toggleCurrency] = useState('USD');
  const [paymentMethod, togglePaymentMethod] = useState('Cartão de crédito');
  const [tag, toggleTag] = useState('Alimentação');

  const resetState = () => {
    setPrice('');
    setDescription('');
    toggleCurrency('USD');
    togglePaymentMethod('Cartão de crédito');
    toggleTag('Alimentação');
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
    resetState();
  };

  return (
    <section>
      <form onSubmit={ (event) => handleSubmit(event) }>
        <input
          data-testid="value-input"
          onChange={ ({ target: { value } }) => setPrice(value) }
          type="text"
          value={ price }
        />
        <input
          data-testid="description-input"
          onChange={ ({ target: { value } }) => setDescription(value) }
          type="text"
          value={ description }
        />
        <select
          data-testid="currency-input"
          onChange={ ({ target: { value } }) => toggleCurrency(value) }
          value={ currency }
        >
          {currencies
            .map((element) => (
              <option label={ element } key={ element }>{element}</option>
            ))}
        </select>
        <select
          data-testid="method-input"
          onChange={ ({ target: { value } }) => togglePaymentMethod(value) }
          value={ paymentMethod }
        >
          {paymentMethods
            .map((element) => (
              <option label={ element } key={ element }>{element}</option>
            ))}
        </select>
        <select
          data-testid="tag-input"
          onChange={ ({ target: { value } }) => toggleTag(value) }
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
