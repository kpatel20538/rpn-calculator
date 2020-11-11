const WHITESPACE = /\s+/;

const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => {
    if (b === 0) {
      throw new Error("Divide by Zero");
    } else {
      return a / b;
    }
  },
};

const parseToken = (token) => {
  const value = parseFloat(token);
  if (!Number.isNaN(value)) {
    return { type: "number", value };
  }

  if (token in operators) {
    return { type: "operator", kind: token };
  }

  throw new Error(`Unknown Value: ${token}`);
};

const parseOpcodes = (text) => {
  const tokens = text.trim().split(WHITESPACE);
  const opcodes = tokens.map(parseToken);
  return opcodes;
};

export const reducer = (state, action) => null
export const getInitialState = () => null;
