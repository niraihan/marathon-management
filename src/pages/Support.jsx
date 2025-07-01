import React from "react";
import { FaQuestionCircle, FaLifeRing, FaHeadset } from "react-icons/fa";
import useTitle from "../hooks/useTitle";


const Support = () => {
  useTitle("Support");

  const faqs = [
    {
      question: "How do I register for a marathon?",
      answer: "You can register through our Marathons page by selecting the event and filling out the registration form.",
    },
    {
      question: "Can I cancel my registration?",
      answer: "Yes, cancellations are possible within the allowed timeframe. Please check the event details for refund policy.",
    },
    {
      question: "How do I contact event organizers?",
      answer: "You can find organizer contact details on each marathon's detail page or reach out via our Contact page.",
    },
  ];

  return (
    <div className="bg-base-100 text-base-content min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-primary text-center mb-6">Support Center</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg transition">
            <FaQuestionCircle className="text-5xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">FAQs</h3>
            <p>Find answers to the most common questions about MarathonPro.</p>
          </div>
          <div className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg transition">
            <FaLifeRing className="text-5xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Help & Guides</h3>
            <p>Step-by-step instructions to help you participate and organize events.</p>
          </div>
          <div className="p-6 bg-base-200 rounded-lg shadow hover:shadow-lg transition">
            <FaHeadset className="text-5xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p>Contact our support team for any questions or assistance.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-10">
          <h3 className="text-2xl font-semibold text-primary mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map(({ question, answer }, idx) => (
              <details key={idx} className="p-4 bg-base-200 rounded-lg shadow">
                <summary className="font-semibold cursor-pointer">{question}</summary>
                <p className="mt-2 text-sm">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
