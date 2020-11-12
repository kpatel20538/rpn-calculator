const WHITESPACE = /\s+/;

const OPERATOR_ARTIY = 2;

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

const reduceStackByOperator = (stack, opcode) => {
  if (stack.length < OPERATOR_ARTIY) {
    throw new Error(`Not enough arguments for operator: ${opcode.kind}`);
  }

  const operation = operators[opcode.kind];
  const opcodes = stack.slice(stack.length - OPERATOR_ARTIY);
  const args = opcodes.map((arg) => arg.value);
  const result = operation(...args);

  const nextOpcode = { type: "number", value: result };
  const nextStack = stack.slice(0, stack.length - OPERATOR_ARTIY);

  nextStack.push(nextOpcode);

  return nextStack;
};

const pushOpcodeToStack = (stack, opcode) => {
  const nextStack =
    opcode.type === "operator"
      ? reduceStackByOperator(stack, opcode)
      : [...stack, opcode];
  return nextStack;
};

export const reducer = (stack, action) => {
  const opcodes = parseOpcodes(action.text);
  const nextStack = opcodes.reduce(pushOpcodeToStack, stack);
  return nextStack;
};

export const getInitialState = () => [];
