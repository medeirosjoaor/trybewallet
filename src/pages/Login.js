import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../redux/actions/index';

const MIN_LENGTH = 6;

function Login({ dispatch, history }) {
  const INITIAL_STATE = {
    email: '',
    password: '',
    isDisabled: true,
  };

  const [{
    email,
    password,
    isDisabled,
  }, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setState((previousState) => ({
      ...previousState,
      isDisabled: !email.match(/\S+@\S+\.\S+/) || password.length < MIN_LENGTH }));
  }, [email, password]);

  const handleChange = ({ target: { name, value } }) => {
    setState((previousState) => ({ ...previousState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(setEmail(email));

    history.push('/carteira');
  };

  return (
    <section>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
          type="email"
          value={ email }
        />
        <input
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
          type="password"
          value={ password }
        />
        <button
          disabled={ isDisabled }
          type="submit"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
