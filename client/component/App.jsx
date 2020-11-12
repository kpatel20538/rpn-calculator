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
          <div className="column is-two-thirds">
            <div className="box">
              <pre>{stack.map((opcode) => opcode.value).join(", ")}</pre>
            </div>
          </div>
          <div className="column is-one-thirds">
            <ErrorLog errors={state.errors} dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
