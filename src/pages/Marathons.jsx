import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/new-marathons?limit=6`)
      .then((res) => res.json())
      .then((data) => setMarathons(data));
  }, []);

  return (
    <div className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Marathons</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {marathons.map((m) => (
          <div key={m._id} className="card shadow-xl">
            <figure><img src={m.image} alt={m.title} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h2 className="card-title">{m.title}</h2>
              <p>📍 {m.location}</p>
              <p> Marathon Date :- {m.marathonDate}</p>
              <div className="card-actions justify-end">
                <Link to={`/marathons/${m._id}`} className="btn btn-sm btn-primary">See Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marathons;
