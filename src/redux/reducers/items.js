const initialState = {
  items: '',
  isLoaded: false,
  news: '',
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
      break;

    case 'SET_ITEMS_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };
      break;

    case 'SET_ITEMS_LOADING':
      return {
        ...state,
        isLoaded: action.payload,
      };
      break;

    case 'SET_NEWS':
      return {
        ...state,
        news: action.payload,
      };
      break;
  }
  return state;
};

export default items;
