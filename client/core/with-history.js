export const withHistory = (reducer) => (state, action) => {
  const nextState = reducer(state.current, action);
  const nextHistoryEntry = { state: nextState, action };
  return {
    current: nextState,
    history: [nextHistoryEntry, ...state.history],
  };
};

export const withHistoryState = (initialState) => ({
  current: initialState,
  history: [],
});
