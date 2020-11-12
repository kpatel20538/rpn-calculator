const removeByIndex = (array, index) => [
  ...array.slice(0, index),
  ...array.slice(index + 1),
];

export const withErrorLog = (reducer) => (state, action) => {
  if (action.type === "dismiss") {
    const nextErrors = removeByIndex(state.errors, action.idx);
    return { ...state, errors: nextErrors };
  }

  try {
    const nextValue = reducer(state.value, action);
    return { ...state, value: nextValue };
  } catch (error) {
    const capturedError = { name: error.name, message: error.message };
    const nextErrors = [...state.errors, capturedError];
    return { ...state, errors: nextErrors };
  }
};

export const withErrorLogState = (initialState) => ({
  value: initialState,
  errors: [],
});
