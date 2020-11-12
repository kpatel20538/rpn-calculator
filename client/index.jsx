import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import { getInitialState, reducer } from "./core";

const App = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [input, setInput] = useState("");

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
        <div className="box">
          <pre>{state.map((opcode) => opcode.value).join(", ")}</pre>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
ReactDOM.render(<App />, container);
