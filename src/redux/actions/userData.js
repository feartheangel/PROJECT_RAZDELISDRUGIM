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
