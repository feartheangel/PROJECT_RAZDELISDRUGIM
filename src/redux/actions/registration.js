export const setRegEntries = (email, number, password, passwordSubmit) => ({
  type: 'SET_REG_ENTRIES',
  payload: { email: email, number: number, password: password, passwordSubmit: passwordSubmit },
});
