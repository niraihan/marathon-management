import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from '../hooks/useTitle';

const MarathonsPage = () => {
  useTitle("MarathonPro | Marathon Page");
  const [sortOrder, setSortOrder] = useState("desc"); //এসাইনমেন্টে এইখানে ভুল কড়ে ছিলাম
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://assignment11-server-dun.vercel.app/marathons?sort=${sortOrder}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setMarathons(data);
        setLoading(false);
      });
  }, [sortOrder]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Marathons</h2>
      {/* sort এইখানে ভুল করে ছি */}
      <div className="text-center mb-6">
        <label htmlFor="sort" className="mr-2 font-semibold">Sort by Date:</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-40 inline-block"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {marathons.map(marathon => (
          <div key={marathon._id} className="card bg-base-100 shadow-xl">
            <figure><img src={marathon.image} alt={marathon.title} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h2 className="card-title">{marathon.title}</h2>
              <p><strong>Location:</strong> {marathon.location}</p>
              <p><strong>Reg:</strong> {new Date(marathon.startRegistrationDate).toLocaleDateString()} - {new Date(marathon.endRegistrationDate).toLocaleDateString()}</p>
              <div className="card-actions justify-end">
                <Link to={`/marathons/${marathon._id}`} className="btn btn-primary">See Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarathonsPage;
