const initialState = {
  maxItemsToPlaceFree: "",
  language: "",
  maxAddressesCount: "",
  serviceIds: [],
  emailSupport: "",
  email: "",
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MAX_ITEMS_TO_PLACE_FREE":
      return {
        ...state,
        maxItemsToPlaceFree: action.payload,
      };
      break;

    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
      break;

    case "SET_MAX_ADDRESSES_COUNT":
      return {
        ...state,
        maxAddressesCount: action.payload,
      };
      break;

    case "SET_SERVICE_IDS":
      return {
        ...state,
        serviceIds: action.payload,
      };
      break;

    case "SET_EMAIL_SETTINGS":
      return {
        ...state,
        email: action.payload,
      };
      break;

    case "SET_EMAIL_SUPPORT":
      return {
        ...state,
        emailSupport: action.payload,
      };
      break;
  }
  return state;
};
export default search;
