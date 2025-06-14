const HowToPrepareSection = () => {
  return (
    <div className="py-12 bg-white px-4 lg:px-16">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">How to Prepare for a Marathon?</h2>
        <p className="mb-4 text-lg">Here are a few tips to help you get ready for your race:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="bg-base-200 p-5 rounded-xl shadow">
            🏃‍♂️ <strong>Train Regularly:</strong> Follow a consistent schedule.
          </div>
          <div className="bg-base-200 p-5 rounded-xl shadow">
            🍎 <strong>Eat Well:</strong> Maintain a healthy diet.
          </div>
          <div className="bg-base-200 p-5 rounded-xl shadow">
            💧 <strong>Hydrate Properly:</strong> Drink enough water before and during the race.
          </div>
          <div className="bg-base-200 p-5 rounded-xl shadow">
            🧢 <strong>Get the Right Gear:</strong> Wear proper running shoes and comfortable clothes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPrepareSection;