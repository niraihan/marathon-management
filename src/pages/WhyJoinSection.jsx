import React from "react";
import { FaRunning, FaUsers, FaBullseye, FaHandHoldingHeart } from "react-icons/fa";

const WhyJoinSection = () => {
  return (
    <div className="py-16 bg-base-200 px-4 md:px-8 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative group overflow-hidden rounded-xl shadow-2xl h-[400px]">
          <img
            src="https://i.ibb.co/ksRpJzzY/13.jpg"
            alt="Marathon Motivation"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition duration-500 rounded-xl"></div> */}
        </div>

        {/* Right Text */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
            Why Join a Marathon?
          </h2>
          <p className="text-lg text-gray-600">
            Joining a marathon is more than just running — it's about growth, community, and making a difference.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <FaRunning className="text-2xl text-accent mt-1" />
              <p className="text-lg font-medium">
                Boost your <span className="text-primary font-semibold">physical fitness</span> & endurance
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaUsers className="text-2xl text-secondary mt-1" />
              <p className="text-lg font-medium">
                Meet <span className="text-primary font-semibold">like-minded people</span> in your community
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaBullseye className="text-2xl text-success mt-1" />
              <p className="text-lg font-medium">
                Challenge yourself & achieve <span className="text-primary font-semibold">personal goals</span>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <FaHandHoldingHeart className="text-2xl text-error mt-1" />
              <p className="text-lg font-medium">
                Support <span className="text-primary font-semibold">charitable causes</span> through events
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinSection;
