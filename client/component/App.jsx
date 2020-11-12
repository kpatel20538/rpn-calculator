import React, { useReducer } from "react";
import { getInitialState, reducer } from "../core";
import ErrorLog from "./ErrorLog";
import InputBar from "./InputBar";
import OutputLog from "./OutputLog";

const App = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  return (
    <div className="container">
      <div className="section">
        <div className="block">
          <InputBar dispatch={dispatch} />
        </div>
        <div className="block">
          <div className="columns">
            <OutputLog history={state.value.history} />
            <ErrorLog errors={state.errors} dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
