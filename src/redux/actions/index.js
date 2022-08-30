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

function setCurrenciesThunk() {
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

const setExpense = (object) => ({
  payload: object,
  type: 'SET_EXPENSE',
});

const deleteExpense = (number) => ({
  payload: number,
  type: 'DELETE_EXPENSE',
});

export {
  setEmail,
  setCurrenciesThunk,
  setExpense,
  deleteExpense,
};
