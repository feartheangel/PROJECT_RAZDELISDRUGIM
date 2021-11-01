export const setmaxItemsToPlaceFree = (num) => ({
  type: "SET_MAX_ITEMS_TO_PLACE_FREE",
  payload: num,
});

export const setmaxItemsToPlaceFreeLegal = (num) => ({
  type: "SET_MAX_ITEMS_TO_PLACE_FREE_LEGAL",
  payload: num,
});

export const setLanguage = (string) => ({
  type: "SET_LANGUAGE",
  payload: string,
});

export const setMaxAddressesCount = (num) => ({
  type: "SET_MAX_ADDRESSES_COUNT",
  payload: num,
});

export const setServiceIds = (arr) => ({
  type: "SET_SERVICE_IDS",
  payload: arr,
});

export const setEmailSettings = (string) => ({
  type: "SET_EMAIL_SETTINGS",
  payload: string,
});

export const setEmailSupport = (string) => ({
  type: "SET_EMAIL_SUPPORT",
  payload: string,
});
