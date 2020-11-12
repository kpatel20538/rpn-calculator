import React, { useState } from "react";

const InputBar = ({ dispatch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setInput("");
    dispatch({ type: "input", text: input });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-grouped">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Enter Input..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </div>
        <div className="control">
          <button className="button is-info" type="submit">
            ↲
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputBar;
