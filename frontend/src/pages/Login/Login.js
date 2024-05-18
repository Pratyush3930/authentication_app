import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({handleLogin}) => {
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
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="input"
          />
          <button type="submit" className="button bg-darkblue w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
