import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import sum from '../helpers/sum';

function Header({ email, expenses }) {
  return (
    <section>
      <p data-testid="email-field">{`Olá, ${email}`}</p>
      <p data-testid="total-field">
        {sum(expenses)}
      </p>
      <p data-testid="header-currency-field">BRL</p>
    </section>
  );
}

const mapStateToProps = ({
  user: { email },
  wallet: { expenses },
}) => ({ email, expenses });

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
