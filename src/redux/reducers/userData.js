const initialState = {
  isLoggedIn: false,
  requestActive: false,
  currentUserId: "",
  addresses: [],
  userData: {},
  subjects: [],
  favorites: [],
  iTakeSubjects: [],
  reload: false,
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case "SET_ADDRESSES":
      return {
        ...state,
        addresses: action.payload,
      };

    case "SET_REQUEST_START":
      return {
        ...state,
        requestActive: action.payload,
      };

    case "SET_REQUEST_END":
      return {
        ...state,
        requestActive: action.payload,
      };

    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };

    case "SET_USER_SUBJECTS":
      return {
        ...state,
        subjects: action.payload,
      };

    case "RELOAD":
      return {
        ...state,
        reload: action.payload,
      };

    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };

    case "SET_I_TAKE_SUBJECTS":
      return {
        ...state,
        iTakeSubjects: action.payload,
      };

    default:
    //nothing
  }
  return state;
};

export default userData;
