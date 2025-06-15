import { FaRunning, FaAppleAlt, FaTint, FaShoePrints } from "react-icons/fa";

const HowToPrepareSection = () => {
  return (
    <div className="py-16 bg-white px-4 md:px-8 lg:px-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold text-blue-500 mb-4">How to Prepare for a Marathon?</h2>
        <p className="text-lg text-gray-600">
          Here are a few tips to help you get ready for your race and perform your best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
       
        <div className="flex items-start gap-4 bg-base-200 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <FaRunning className="text-3xl text-accent mt-1" />
          <div>
            <h4 className="text-xl font-semibold mb-1">Train Regularly</h4>
            <p className="text-gray-600">Follow a consistent running schedule to build endurance and strength.</p>
          </div>
        </div>

      
        <div className="flex items-start gap-4 bg-base-200 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <FaAppleAlt className="text-3xl text-success mt-1" />
          <div>
            <h4 className="text-xl font-semibold mb-1">Eat Well</h4>
            <p className="text-gray-600">Maintain a balanced and nutritious diet to fuel your training.</p>
          </div>
        </div>


        <div className="flex items-start gap-4 bg-base-200 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <FaTint className="text-3xl text-info mt-1" />
          <div>
            <h4 className="text-xl font-semibold mb-1">Hydrate Properly</h4>
            <p className="text-gray-600">Drink plenty of water before, during, and after your run.</p>
          </div>
        </div>

       
        <div className="flex items-start gap-4 bg-base-200 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300">
          <FaShoePrints className="text-3xl text-warning mt-1" />
          <div>
            <h4 className="text-xl font-semibold mb-1">Get the Right Gear</h4>
            <p className="text-gray-600">Use comfortable running shoes and weather-appropriate clothing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPrepareSection;
