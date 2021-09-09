export const loginAction = () => ({
  type: "LOGIN",
  payload: true,
});

export const logoutAction = () => ({
  type: "LOGOUT",
  payload: false,
});

export const setAdresses = (list) => ({
  type: "SET_ADDRESSES",
  payload: list,
});

export const setQueryStarted = () => ({
  type: "SET_REQUEST_START",
  payload: true,
});

export const setQueryDone = () => ({
  type: "SET_REQUEST_END",
  payload: false,
});

export const setUserData = (object) => ({
  type: "SET_USER_DATA",
  payload: object,
});

export const setUserSubjects = (array) => ({
  type: "SET_USER_SUBJECTS",
  payload: array,
});

export const reloadData = (arg) => ({
  type: "RELOAD",
  payload: arg,
});

export const setFavorites = (arr) => ({
  type: "SET_FAVORITES",
  payload: arr,
});

export const setRefCode = (code) => ({
  type: "SET_REF_CODE",
  payload: code,
});
