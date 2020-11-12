import { withErrorLog, withErrorLogState } from "../core/with-error-log";

describe("error log middleware", () => {
  test("pass-through operations that do not throw", () => {
    const reducer = withErrorLog((state, action) => action.value);
    const state = withErrorLogState("a");
    const action = { type: "set", value: "b" };

    const nextState = reducer(state, action);

    expect(nextState).toStrictEqual({
      value: "b",
      errors: [],
    });
  });

  test("capture error for operations that throw", () => {
    const reducer = withErrorLog((state, action) => {
      throw new Error(action.value);
    });
    let state = withErrorLogState("a");

    state = reducer(state, { type: "throw", value: "b" });
    expect(state).toStrictEqual({
      value: "a",
      errors: [{ name: "Error", message: "b" }],
    });

    state = reducer(state, { type: "throw", value: "c" });
    expect(state).toStrictEqual({
      value: "a",
      errors: [
        { name: "Error", message: "b" },
        { name: "Error", message: "c" },
      ],
    });
  });

  test("dismiss error by index", () => {
    const reducer = withErrorLog((state, action) => action.value);
    const state = {
      value: "a",
      errors: [
        { name: "Error", message: "error message 0" },
        { name: "Error", message: "error message 1" },
        { name: "Error", message: "error message 2" },
      ],
    };
    const action = { type: "dismiss", idx: 1 };

    const nextState = reducer(state, action);
    expect(nextState).toStrictEqual({
      value: "a",
      errors: [
        { name: "Error", message: "error message 0" },
        { name: "Error", message: "error message 2" },
      ],
    });
  });
});
