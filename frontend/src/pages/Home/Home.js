import React from "react";
import { Link } from "react-router-dom";

const Home = ({ handleLogOut, loggedIn, setMenu }) => {
  return (
    <>
      {loggedIn ? (
        <div
          className="flex
      items-center justify-center w-full flex-1 flex-col gap-10"
        >
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl font-bold leading-8 tracking-wide">
              Thank you for logging in
            </h2>
            <p className="text-lg font-normal tracking-tight">
              Please choose from the given options:
            </p>
          </div>
          <div className="flex flex-row gap-10">
            <button
              className="button bg-darkblue"
              onClick={() => {
                handleLogOut();
              }}
            >
              LogOut
            </button>
            <button className="button" onClick={() => setMenu("profile")}>
              <Link to="/profile">See Profile Info</Link>
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex
      items-center justify-center w-full flex-1 flex-col gap-10"
        >
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl font-bold leading-8 tracking-wide">
              USER Authenticatin System with CRUD operations
            </h2>
            <div className="text-lg font-normal tracking-tight">
              This is a user authentication system developed using react as
              front end and express as backend.
              <p className="text-sm mt-4">
                <Link to="login">
                  <span className="text-red-500 hover:text-red-600 hover:border-b hover:border-red-400 cursor-pointer">
                    Login
                  </span>
                </Link>{" "}
                or{" "}
                <Link to="signup">
                  <span className="text-red-500 hover:text-red-600 hover:border-b hover:border-red-400 cursor-pointer">
                    Signup
                  </span>
                </Link>{" "}
                to get started
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
