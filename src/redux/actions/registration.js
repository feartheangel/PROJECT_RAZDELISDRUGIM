export const setRegEntries = (email, number, password) => ({
  type: 'SET_REG_ENTRIES',
  payload: { email: email, number: number, password: password },
});
