const initialState = {
  isLoggedIn: false,
  currentUserId: '',
  addresses: [],
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
      break;

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
      break;

    case 'SET_ADDRESSES':
      return {
        ...state,
        addresses: action.payload,
      };
  }
  return state;
};

export default userData;
