import React from 'react';

import { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

// import useTitle from '../../hook/useTitle';


const MyProfile = () => {
    // useTitle("Plants - MyProfile");

    const { user, logOut } = useContext(AuthContext);

    return (
        <div className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-white rounded-xl">
            <div className="text-center">
                <img
                    src={user?.photoURL || "https://i.ibb.co/5n5TtZL/default.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold">{user?.displayName || "No Name"}</h2>
                <p className="text-gray-600">{user?.email}</p>

                <div className="mt-4 space-y-2">
                    <Link to="/update-profile" className="btn btn-outline btn-sm w-full">
                        Update Profile
                    </Link>
                    <button
                        onClick={logOut}
                        className="btn btn-error btn-sm w-full text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
