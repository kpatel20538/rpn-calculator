import React, { useReducer } from "react";
import { getInitialState, reducer } from "../core";
import ErrorLog from "./ErrorLog";
import InputBar from "./InputBar";

const App = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const stack = state.value;

  return (
    <div className="container">
      <div className="section">
        <InputBar dispatch={dispatch} />
        <div className="columns">
          <div className="column">
            <div className="box">
              <pre>{stack.map((opcode) => opcode.value).join(", ")}</pre>
            </div>
          </div>
          {state.errors.length > 0 && (
            <div className="column is-one-third">
              <ErrorLog errors={state.errors} dispatch={dispatch} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
