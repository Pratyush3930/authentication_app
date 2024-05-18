import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, userData ,setMenu , menu}) => {

  return (
    <div className="py-5 flex justify-between items-center">
      <div className="flex gap-8 justify-center item-center">
        <div className="font-bold text-4xl">
          <Link to="/">Logo.</Link>
        </div>
        <ul className="flex gap-4 my-2">
          <li
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            <Link to="/">Home</Link>
          </li>
          {loggedIn && (
            <li
              onClick={() => setMenu("profile")}
              className={menu === "profile" ? "active" : ""}
            >
              <Link to="/profile">Profile</Link>
            </li>
          )}
        </ul>
      </div>
      {!loggedIn ? (
        <div className="flex gap-5">
          <button className="font-normal cursor-pointer">
            <Link to="/login">Log in</Link>
          </button>
          <button className="button">
            <Link to="/signup">Sign up</Link>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/profile">
            <img
              src="./profile.png"
              alt=""
              className="w-10 border cursor-pointer border-gray-300 rounded-full"
              onClick={() => setMenu('profile')}
            />
          </Link>
          <p className="text-sm font-medium cursor-pointer">
            {userData?.name?.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
