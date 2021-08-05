export const setUserCoords = (coords) => ({
  type: 'SET_USER_COORDS',
  payload: coords,
});

export const setSearchWords = (words) => ({
  type: 'SET_SEARCH_WORDS',
  payload: words,
});

export const setSearchItems = (items) => ({
  type: 'SET_SEARCH_ITEMS',
  payload: items,
});

export const setSearchCategory = (id) => ({
  type: 'SET_SEARCH_CATEGORY',
  payload: id,
});

export const setMinPrice = (price) => ({
  type: 'SET_MIN_PRICE',
  payload: price,
});

export const setMaxPrice = (price) => ({
  type: 'SET_MAX_PRICE',
  payload: price,
});

export const setFree = (bool) => ({
  type: 'SET_FREE',
  payload: bool,
});

export const setStatus = (status) => ({
  type: 'SET_STATUS',
  payload: status,
});

export const setDelivery = (bool) => ({
  type: 'SET_DELIVERY',
  payload: bool,
});

export const setInsurance = (bool) => ({
  type: 'SET_INSURANCE',
  payload: bool,
});

export const setContract = (bool) => ({
  type: 'SET_CONTRACT',
  payload: bool,
});

export const setPledge = (bool) => ({
  type: 'SET_PLEDGE',
  payload: bool,
});

export const setDistance = (dist) => ({
  type: 'SET_DISTANCE',
  payload: dist,
});

export const setCategoryId = (id) => ({
  type: 'SET_CATEGORY_ID',
  payload: id,
});
