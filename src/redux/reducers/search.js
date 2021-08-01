const initialState = {
  userCoordinates: '',
  words: '',
  searchItems: [],
  category: '',
  min_price: '',
  max_price: '',
  free: false,
  status: false,
  delivery: false,
  insurance: false,
  contract: false,
  pledge: false,
  distance: '',
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_WORDS':
      return {
        ...state,
        words: action.payload,
      };
      break;

    case 'SET_SEARCH_ITEMS':
      return {
        ...state,
        searchItems: action.payload,
      };
      break;

    case 'SET_SEARCH_CATEGORY':
      return {
        ...state,
        category: action.payload,
      };
      break;

    case 'SET_MIN_PRICE':
      return {
        ...state,
        min_price: action.payload,
      };
      break;

    case 'SET_MAX_PRICE':
      return {
        ...state,
        max_price: action.payload,
      };
      break;

    case 'SET_USER_COORDS':
      return {
        ...state,
        userCoordinates: action.payload,
      };
      break;

    case 'SET_FREE':
      return {
        ...state,
        free: action.payload,
      };
      break;

    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
      break;

    case 'SET_DELIVERY':
      return {
        ...state,
        delivery: action.payload,
      };
      break;

    case 'SET_INSURANCE':
      return {
        ...state,
        insurance: action.payload,
      };
      break;

    case 'SET_CONTRACT':
      return {
        ...state,
        contract: action.payload,
      };
      break;

    case 'SET_PLEDGE':
      return {
        ...state,
        pledge: action.payload,
      };
      break;

    case 'SET_DISTANCE':
      return {
        ...state,
        distance: action.payload,
      };
      break;
  }
  return state;
};
export default search;
