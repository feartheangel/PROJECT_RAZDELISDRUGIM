const initialState = {
  isLoggedIn: false,
  currentUserId: '',
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: action.payload,
        currentUserId: '',
      };
      break;

    case 'LOGOUT':
      return {
        isLoggedIn: action.payload,
        currentUserId: '',
      };
      break;
  }
  return state;
};

export default userData;
