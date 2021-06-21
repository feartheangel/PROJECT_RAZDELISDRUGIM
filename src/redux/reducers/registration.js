const initialState = {
  password: '',
  name: '',
  surname: '',
  birth: '',
  sentEmail: '',
  sentNumber: '',
  promo: '',
};

const registration = (state = initialState, action) => {
  if (action.type === 'SET_REG_ENTRIES') {
    state.sentEmail = action.payload.email;
    state.sentNumber = action.payload.number;
    state.password = action.payload.password;
  }

  return state;
};

export default registration;
