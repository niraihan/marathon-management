import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assignment11-server-dun.vercel.app/new-marathons?limit=6")
      .then((res) => res.json())
      .then((data) => setMarathons(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">
        Latest Marathons
      </h2>

      {/* ✅ লোডিং স্পিনার */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <span className="loading loading-spinner text-primary w-16 h-16"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {marathons.map((m) => (
              <div
                key={m._id}
                className="card bg-base-100 shadow-lg hover:shadow-2xl group transition duration-300 rounded-lg overflow-hidden"
              >
                {/* Card image */}
                <figure className="relative">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white  bg-blue-500 bg-opacity-50">
                    {new Date(m.marathonDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </figure>

                {/* Card body */}
                <div className="card-body">
                  <h3 className="card-title text-lg font-bold">{m.title}</h3>
                  <h5 className="badge badge-outline">Reg:-{new Date(m.startRegistrationDate).toLocaleDateString()} - {new Date(m.endRegistrationDate).toLocaleDateString()}</h5>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="badge badge-ghost gap-1">📍 {m.location}</span>
                    {m.distance && (
                      <span className="badge badge-outline">Distance:-{m.distance}</span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <Link
                      to={`/marathons/${m._id}`}
                      className="btn btn-sm btn-primary w-full"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          {marathons.length >= 6 && (
            <div className="text-center mt-10">
              <Link to="/marathons" className="btn btn-outline btn-wide">
                View All Marathons
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Marathons;
