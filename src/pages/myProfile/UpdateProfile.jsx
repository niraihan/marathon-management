import React from 'react';

import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from '../../context/AuthContext';
import useTitle from '../../hooks/useTitle';




const UpdateProfile = () => {
    useTitle("MarathonPro - UpdateProfile");

  const { updateUserProfile, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdate = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    // const number = form.number.value;

    updateUserProfile(name, photo)
      .then(() => {
        toast.success("Profile updated!");
        navigate("/my-profile");
      })
      .catch(() => {
        toast.error("Failed to update");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-white rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          defaultValue={user?.displayName}
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="photo"
          defaultValue={user?.photoURL}
          placeholder="Photo URL"
          className="input input-bordered w-full"
        />
        {/* <input
          type="text"
          name="number"
          defaultValue={user?.number}
          placeholder="Number"
          className="input input-bordered w-full"
        /> */}
        <button type="submit" className="btn btn-primary w-full">
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
