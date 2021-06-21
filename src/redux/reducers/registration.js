const initialState = {
  password: '',
  name: '',
  surname: '',
  birth: '',
  sentEmail: '',
  sentNumber: '',
  passwordSubmit: '',
  promo: '',
};

const registration = (state = initialState, action) => {
  if (action.type === 'SET_REG_ENTRIES') {
    state.sentEmail = action.payload.email;
    state.sentNumber = action.payload.number;
    state.password = action.payload.password;
    state.passwordSubmit = action.payload.passwordSubmit;
  }

  return state;
};

export default registration;
