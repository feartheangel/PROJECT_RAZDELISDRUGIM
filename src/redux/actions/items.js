export const setItems = (items) => ({
  type: 'SET_ITEMS',
  payload: items,
});

export const setItemsLoaded = () => ({
  type: 'SET_ITEMS_LOADED',
  payload: true,
});

export const setItemsLoading = () => ({
  type: 'SET_ITEMS_LOADING',
  payload: false,
});
