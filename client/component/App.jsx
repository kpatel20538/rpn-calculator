import React, { useReducer, useState } from "react";
import { getInitialState, reducer } from "../core";
import ErrorLog from "./ErrorLog";

const App = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [input, setInput] = useState("");

  const stack = state.value;

  return (
    <div className="container">
      <div className="section">
        <div className="field is-grouped">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              placeholder="Enter Input..."
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
          </div>
          <div className="control">
            <button
              className="button is-info"
              onClick={() => {
                setInput("");
                dispatch({ type: "input", text: input });
              }}
            >
              +
            </button>
          </div>
        </div>
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