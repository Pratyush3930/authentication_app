import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({registerUser , matchPass}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="font-semibold text-2xl">Sign up</h1>
        <form
          action="/signup"
          className="flex flex-col justify-center items-center gap-8"
          method="POST"
          onSubmit={(e) => registerUser(e, navigate)}
        >
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Username"
            className="input"
          />
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
          <input
            type="password"
            id="repassword"
            name="repassword"
            placeholder="Re-enter password"
            className="input"
          />
          {!matchPass && <p className="text-red-400 font-medium text-sm">Your password do not match!</p> }
          <button type="submit" className="button bg-darkblue w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
