import fetchCurrencies from '../../helpers/fetchCurrencies';

const setEmail = (value) => ({
  payload: value,
  type: 'SET_EMAIL',
});

const setCurrencies = () => ({
  type: 'SET_CURRENCIES',
});

const setCurrenciesSucess = (object) => ({
  payload: object,
  type: 'SET_CURRENCIES_SUCESS',
});

const setCurrenciesFailure = (error) => ({
  error,
  type: 'SET_CURRENCIES_FAILURE',
});

function fetchCurrenciesThunk() {
  return async (dispatch) => {
    dispatch(setCurrencies());

    try {
      const object = await fetchCurrencies();

      dispatch(setCurrenciesSucess(object));
    } catch (error) {
      dispatch(setCurrenciesFailure(error));
    }
  };
}

export {
  setEmail,
  fetchCurrenciesThunk,
};
