import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ userData, handleDelete, handleEdit }) => {
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <div className="flex bg-black justify-center mt-8 gap-2 border w-fit shadow-md shadow-gray-400 rounded-lg">
        <img src="./profilepic.jpeg" alt="" className="w-72 rounded-xl p-2" />
        <div className="flex items-start gap-4 justify-center flex-col pr-8">
          <p className="text-sm text-gray-500">Username</p>
          <p className="text-white font-light">{userData?.name}</p>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-white font-light">{userData?.email}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-8">
        <button className="font-medium cursor-pointer hover:font-bold">
          <Link to="/editprofile">Edit profile</Link>
        </button>
        <button
          className="button bg-red-950 hover:bg-red-800"
          onClick={() => handleDelete()}
        >
          Delete profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
