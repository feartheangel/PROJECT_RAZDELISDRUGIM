const initialState = {
  items: '',
};

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        items: action.payload,
      };
      break;
  }
  return state;
};

export default items;
