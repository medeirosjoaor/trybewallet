const INITIAL_STATE = {
  currencies: [],
  editor: false,
  expenses: [],
  idToEdit: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  if (action.type === 'SET_CURRENCIES') {
    return state;
  }

  if (action.type === 'SET_CURRENCIES_SUCESS') {
    return {
      ...state,
      currencies: Object
        .keys(action.payload)
        .filter((element) => element !== 'USDT'),
    };
  }

  if (action.type === 'SET_CURRENCIES_FAILURE') {
    return {
      ...state,
      error: action.error,
    };
  }

  if (action.type === 'SET_EXPENSE') {
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  }

  return state;
}
