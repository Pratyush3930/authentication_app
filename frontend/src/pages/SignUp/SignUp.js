import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ registerUser, matchPass, error, errMsg, validPass }) => {
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
            required
          />
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
          <input
            type="password"
            id="repassword"
            name="repassword"
            placeholder="Re-enter password"
            className="input"
            required
          />
          {!matchPass && !error && (
            <p className="error">Your password do not match!</p>
          )}
          {error && <p className="error ">{errMsg}</p>}
          {!validPass && (
            <p className="error text-wrap">
              The password must contain one lowercase letter, one uppercase
              letter, one digit, and one special character.
            </p>
          )}
          <button type="submit" className="button bg-darkblue min-w-30 w-52">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
