import { withHistory, withHistoryState } from "../core/with-history";

describe("history middleware", () => {
  test("append to history for any operation", () => {
    const reducer = withHistory((state, action) => action.value);
    let state = withHistoryState("a");

    state = reducer(state, { type: "set", value: "b" });
    expect(state).toStrictEqual({
      current: "b",
      history: [{ state: "b", action: { type: "set", value: "b" } }],
    });

    state = reducer(state, { type: "set", value: "c" });
    expect(state).toStrictEqual({
      current: "c",
      history: [
        { state: "b", action: { type: "set", value: "b" } },
        { state: "c", action: { type: "set", value: "c" } },
      ],
    });
  });
});
