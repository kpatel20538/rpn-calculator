import React from "react";

const ErrorLog = ({ errors, dispatch }) => {
  return (
    <div className="box">
      {errors.map(({ name, message }, idx) => (
        <div className="notification is-warning">
          <button
            class="delete"
            onClick={() => dispatch({ type: "dismiss", idx })}
          />
          <div className="title is-5">{name}</div>
          {message}
        </div>
      ))}
    </div>
  );
};

export default ErrorLog;
