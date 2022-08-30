import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrenciesThunk } from '../redux/actions/index';
import paymentMethods from '../helpers/paymentMethods';
import tags from '../helpers/tags';

function WalletForm({ currencies, getCurrencies }) {
  useEffect(() => getCurrencies(), [getCurrencies]);

  const [currency, toggleCurrency] = useState('USD');
  const [paymentMethod, togglePaymentMethod] = useState('Cartão de crédito');
  const [tag, toggleTag] = useState('Alimentação');

  return (
    <section>
      <input data-testid="value-input" type="text" />
      <input data-testid="description-input" type="text" />
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
    </section>
  );
}

const mapStateToProps = ({ wallet: { currencies } }) => ({ currencies });

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

WalletForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.shape).isRequired,
  getCurrencies: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
