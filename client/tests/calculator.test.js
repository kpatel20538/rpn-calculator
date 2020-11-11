import { add } from "../core/calculator";

describe("addition operator", () => {
  test("can add ", () => {
    expect(add(1, 2)).toBe(3);
  });
});
