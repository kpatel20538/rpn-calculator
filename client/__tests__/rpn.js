import { reducer, getInitialState } from "../core/rpn";

const peek = (stack) => stack[stack.length - 1].value;

describe("reverse polish calculator", () => {
  test("single inputs over time", () => {
    let state = getInitialState();

    state = reducer(state, { type: "input", text: "5" });
    expect(peek(state)).toBe(5);

    state = reducer(state, { type: "input", text: "8" });
    expect(peek(state)).toBe(8);

    state = reducer(state, { type: "input", text: "+" });
    expect(peek(state)).toBe(13);
  });

  test("muliple inputs per line", () => {
    let state = getInitialState();

    state = reducer(state, { type: "input", text: "5 5 5 8 + + -" });
    expect(peek(state)).toBe(-13);

    state = reducer(state, { type: "input", text: "13 +" });
    expect(peek(state)).toBe(0);
  });

  test("negative numbers as input", () => {
    let state = getInitialState();

    state = reducer(state, { type: "input", text: "-3" });
    expect(peek(state)).toBe(-3);

    state = reducer(state, { type: "input", text: "-2" });
    expect(peek(state)).toBe(-2);

    state = reducer(state, { type: "input", text: "*" });
    expect(peek(state)).toBe(6);

    state = reducer(state, { type: "input", text: "5" });
    expect(peek(state)).toBe(5);

    state = reducer(state, { type: "input", text: "+" });
    expect(peek(state)).toBe(11);
  });

  test("floating point as results", () => {
    let state = getInitialState();

    state = reducer(state, { type: "input", text: "5" });
    expect(peek(state)).toBe(5);

    state = reducer(state, { type: "input", text: "9" });
    expect(peek(state)).toBe(9);

    state = reducer(state, { type: "input", text: "1" });
    expect(peek(state)).toBe(1);

    state = reducer(state, { type: "input", text: "-" });
    expect(peek(state)).toBe(8);

    state = reducer(state, { type: "input", text: "/" });
    expect(peek(state)).toBeCloseTo(0.625);
  });

  test("unable to divide by 0", () => {
    const state = getInitialState();
    const action = { type: "input", text: "1 0 /" };

    expect(() => reducer(state, action)).toThrow();
  });

  test("unable to resolve operator when not enough values present", () => {
    const state = getInitialState();
    const action = { type: "input", text: "1 +" };

    expect(() => reducer(state, action)).toThrow();
  });

  test("unable to parse unknown values", () => {
    const state = getInitialState();
    const action = { type: "input", text: "p" };

    expect(() => reducer(state, action)).toThrow();
  });

  describe("regression test", () => {
    test("unable to parse unknown values that are prefix with a nubmer", () => {
      const state = getInitialState();
      const action = { type: "input", text: "3p" };
  
      expect(() => reducer(state, action)).toThrow();
    });
  
  })
});
