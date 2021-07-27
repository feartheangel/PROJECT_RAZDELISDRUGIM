const initialState = {
  words: '',
  searchItems: [],
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
  }
  return state;
};
export default search;
