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
        <InputBar dispatch={dispatch} />
        <div className="columns">
          <div className="column">
            <OutputLog history={state.value.history} />
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
