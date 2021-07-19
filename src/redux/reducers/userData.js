const initialState = {
  isLoggedIn: false,
  requestActive: false,
  currentUserId: '',
  addresses: [],
  userData: {},
  subjects: [],
  reload: false,
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

    case 'SET_REQUEST_START':
      return {
        ...state,
        requestActive: action.payload,
      };
      break;

    case 'SET_REQUEST_END':
      return {
        ...state,
        requestActive: action.payload,
      };
      break;

    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
      break;

    case 'SET_USER_SUBJECTS':
      return {
        ...state,
        subjects: action.payload,
      };
      break;

    case 'RELOAD':
      return {
        ...state,
        reload: action.payload,
      };
      break;
  }
  return state;
};

export default userData;
