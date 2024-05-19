import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLogin, error, errMsg }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="font-semibold text-2xl">Log in</h1>
        <form
          action="/login"
          className="flex flex-col justify-center items-center gap-8"
          method="POST"
          onSubmit={(e) => handleLogin(e, navigate)}
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="input"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="input"
            required
          />
          {error && <p className="error ">{errMsg}</p>}

          <button type="submit" className="button bg-darkblue min-w-30 w-52">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
