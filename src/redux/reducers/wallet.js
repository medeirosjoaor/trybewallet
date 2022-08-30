const INITIAL_STATE = {
  currencies: [],
  editor: false,
  expenses: [],
  idToEdit: Date.now(),
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_CURRENCIES':
    return state;
  case 'SET_CURRENCIES_SUCESS':
    return {
      ...state,
      currencies: Object
        .keys(action.payload)
        .filter((element) => element !== 'USDT'),
    };
  case 'SET_CURRENCIES_FAILURE':
    return {
      ...state,
      error: action.error,
    };
  case 'SET_EXPENSE':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ].sort((a, b) => a.id - b.id),
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case 'SET_ID_TO_EDIT':
    return {
      ...state,
      editor: action.payload.boolean,
      idToEdit: action.payload.number,
    };
  default:
    return state;
  }
}
