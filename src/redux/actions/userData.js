export const loginAction = () => ({
  type: 'LOGIN',
  payload: true,
});

export const logoutAction = () => ({
  type: 'LOGOUT',
  payload: false,
});

export const setAdresses = (list) => ({
  type: 'SET_ADDRESSES',
  payload: list,
});

export const setQueryStarted = () => ({
  type: 'SET_REQUEST_START',
  payload: true,
});

export const setQueryDone = () => ({
  type: 'SET_REQUEST_END',
  payload: false,
});
