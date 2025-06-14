import React from "react";

const WhyJoinSection = () => {
  return (
    <div className="py-12 bg-base-200 px-4 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <img
          src="https://i.ibb.co/2sHxDHF/marathon-run.jpg"
          alt="Marathon Motivation"
          className="rounded-xl shadow-xl"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Why Join a Marathon?</h2>
          <ul className="list-disc ml-6 space-y-2 text-lg">
            <li>Boost your physical fitness & endurance</li>
            <li>Meet like-minded people in your community</li>
            <li>Challenge yourself & achieve personal goals</li>
            <li>Support charitable causes through events</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinSection;