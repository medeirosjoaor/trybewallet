import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import setEmail from '../redux/actions/index';

const MIN_LENGTH = 6;

function Login({ email, dispatch, history }) {
  const [password, setPassword] = useState('');
  const [isDisabled, toggleButton] = useState(true);

  useEffect(() => {
    toggleButton(() => !email.match(/\S+@\S+\.\S+/) || password.length < MIN_LENGTH);
  }, [email, password]);

  return (
    <section>
      <input
        data-testid="email-input"
        onChange={ ({ target: { value } }) => dispatch(setEmail(value)) }
        type="email"
        value={ email }
      />
      <input
        data-testid="password-input"
        onChange={ ({ target: { value } }) => setPassword(value) }
        type="password"
        value={ password }
      />
      <button
        disabled={ isDisabled }
        onClick={ () => history.push('/carteira') }
        type="button"
      >
        Entrar
      </button>
    </section>
  );
}

Login.propTypes = {
  email: propTypes.string.isRequired,
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ user }) => ({ email: user.email });

export default connect(mapStateToProps)(Login);
