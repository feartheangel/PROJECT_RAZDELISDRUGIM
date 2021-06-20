const initialState = {
  contact: '',
  password: '',
  name: '',
  surname: '',
  birth: '',
  number: '',
  promo: '',
};

const registration = (state = initialState, action) => {
  if (action.type === 'SET_REG_ENTRIES') {
    state.contact = action.payload.contact;
    state.password = action.payload.password;
  }

  return state;
};

export default registration;
