const initialState = {
  password: '',
  sentEmail: '',
  sentNumber: '',
  passwordSubmit: '',
  regType: '',
  email: '',
};

const registration = (state = initialState, action) => {
  if (action.type === 'SET_REG_ENTRIES') {
    state.sentEmail = action.payload.email;
    state.sentNumber = action.payload.number;
    state.password = action.payload.password;
    state.passwordSubmit = action.payload.passwordSubmit;
    state.regType = action.payload.regType;
  }

  if (action.type === 'SET_LAST_EMAIL') {
    state.email = action.payload.email;
  }

  return state;
};

export default registration;
