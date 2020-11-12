import React from "react";

const renderUserInput = (action) => (
  <div>
    <strong>► </strong>
    <em>{action.text.trim()}</em>
  </div>
);

const renderCalculatorStack = (state) => {
  const topOpcode = state[state.length - 1];
  const remainingOpcodes = state.slice(0, state.length - 1);

  return (
    <div>
      {remainingOpcodes
        .slice(0, state.length - 1)
        .map((opcode) => `${opcode.value}, `)
        .join("")}
      <strong>{topOpcode.value}</strong>
    </div>
  );
}

const OutputLog = ({ history }) => {
  return (
    <pre className="box">
      {history.map(({ state, action }) => (
        <div className="block">
          {renderUserInput(action)}
          {renderCalculatorStack(state)}
          <hr />
        </div>
      ))}
    </pre>
  );
};

export default OutputLog;
