const initialState = {
  percent: 0,
};

const itemUploading = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PERCENT":
      return {
        ...state,
        percent: action.payload,
      };

    default:
    //nothing
  }
  return state;
};

export default itemUploading;
