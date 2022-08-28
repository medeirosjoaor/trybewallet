const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  if (action.type === 'SET_EMAIL') {
    return {
      ...state,
      email: action.payload,
    };
  }

  return state;
}
