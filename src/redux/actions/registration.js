export const setRegEntries = (contact, password) => ({
  type: 'SET_REG_ENTRIES',
  payload: { contact: contact, password: password },
});
