const WHITESPACE = /\s+/;

const OPERATOR_ARTIY = 2;

const OPERATORS = {
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
  const value = Number(token);
  if (!Number.isNaN(value)) {
    return { type: "number", value };
  }

  if (token in OPERATORS) {
    return { type: "operator", kind: token };
  }

  throw new Error(`Unknown Value: ${token}`);
};

const parseOpcodes = (text) => {
  const tokens = text.trim().split(WHITESPACE);
  const opcodes = tokens.map(parseToken);
  return opcodes;
};

const resolveOperationOpcode = (stack, opcode) => {
  if (stack.length < OPERATOR_ARTIY) {
    throw new Error(`Not enough arguments for operator: ${opcode.kind}`);
  }

  const operation = OPERATORS[opcode.kind];
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
      ? resolveOperationOpcode(stack, opcode)
      : [...stack, opcode];
  return nextStack;
};

export const reducer = (stack, action) => {
  if (action.type === "input") {
    const opcodes = parseOpcodes(action.text);
    const nextStack = opcodes.reduce(pushOpcodeToStack, stack);
    return nextStack;
  } else {
    return stack;
  }
};

export const getInitialState = () => [];
