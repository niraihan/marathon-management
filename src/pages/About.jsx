import React from "react";
import { FaUsers, FaMapMarkedAlt, FaRunning, FaRegClock } from "react-icons/fa";
import useTitle from "../hooks/useTitle";


const About = () => {
  useTitle("About Us");

  return (
    <div className="bg-base-100 text-base-content min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">About MarathonPro</h2>
          <p className="text-lg text-base-content max-w-3xl mx-auto">
            MarathonPro is your all-in-one platform for discovering, organizing, and participating in marathons worldwide. Whether you're a runner, an organizer, or a passionate supporter — we're here to connect the community.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="https://i.ibb.co/LDJ5CTwj/4368.jpg"
            alt="Our Mission"
            className="rounded-2xl shadow-md max-w-full"
          />
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-3">Our Mission</h3>
            <p>
              At MarathonPro, our mission is to empower runners and promote healthy lifestyles through accessible and well-organized marathon events. We strive to build a global network of events, communities, and inspiration.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg transition">
            <FaUsers className="text-4xl mx-auto text-primary mb-2" />
            <h4 className="text-xl font-bold">15K+ Runners</h4>
            <p className="text-sm">Connected through our platform</p>
          </div>

          <div className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg transition">
            <FaMapMarkedAlt className="text-4xl mx-auto text-primary mb-2" />
            <h4 className="text-xl font-bold">80+ Cities</h4>
            <p className="text-sm">Across 10+ countries</p>
          </div>

          <div className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg transition">
            <FaRunning className="text-4xl mx-auto text-primary mb-2" />
            <h4 className="text-xl font-bold">200+ Events</h4>
            <p className="text-sm">Successfully hosted & managed</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-4">Why Choose MarathonPro?</h3>
          <p>
            Our platform offers real-time registration, easy event management, secure user dashboard, and a vibrant community. We're committed to providing a seamless experience whether you're a casual runner or a professional athlete.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
