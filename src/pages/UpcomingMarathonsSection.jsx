const UpcomingMarathonsSection = () => {
  const marathons = [
    {
      id: 1,
      title: "Dhaka City Marathon",
      location: "Hatirjheel, Dhaka",
      registrationStart: "2025-06-20",
      registrationEnd: "2025-07-15",
      imageUrl: "https://i.ibb.co/W4tGnCNg/003.webp",
    },
    {
      id: 2,
      title: "Cox’s Bazar Beach Run",
      location: "Cox’s Bazar Sea Beach",
      registrationStart: "2025-07-01",
      registrationEnd: "2025-07-30",
      imageUrl: "https://i.ibb.co/vCYH8VHH/03.jpg",
    },
    {
      id: 3,
      title: "Sylhet Green Run",
      location: "Sylhet City",
      registrationStart: "2025-07-10",
      registrationEnd: "2025-08-05",
      imageUrl: "https://i.ibb.co/Gvh3Yg3J/007.jpg",
    },
    {
      id: 4,
      title: "Chattogram Hill Challenge",
      location: "Foy’s Lake, Chattogram",
      registrationStart: "2025-06-25",
      registrationEnd: "2025-07-20",
      imageUrl: "https://i.ibb.co/Fk3Wcg72/chad-stembridge-ynym-ft-LYd-E-unsplash.jpg",
    },
    {
      id: 5,
      title: "Rangpur Night Run",
      location: "Rangpur Stadium",
      registrationStart: "2025-07-05",
      registrationEnd: "2025-08-01",
      imageUrl: "https://i.ibb.co/G4YND3gz/images-1.jpg",
    },
    {
      id: 6,
      title: "Khulna River Marathon",
      location: "Rupsha Bridge Area, Khulna",
      registrationStart: "2025-06-18",
      registrationEnd: "2025-07-10",
      imageUrl: "https://i.ibb.co/HfFvYfWd/khulna.jpg",
    },
  ];

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        🏃‍♂️ Upcoming Marathons
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((m) => (
          <div
            key={m.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
          >
            <figure>
              <img
                src={m.imageUrl}
                alt={m.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{m.title}</h3>
              <p className="text-gray-600 text-sm">{m.location}</p>
              <p className="text-sm">
                Registration:{" "}
                {new Date(m.registrationStart).toLocaleDateString()} –{" "}
                {new Date(m.registrationEnd).toLocaleDateString()}
              </p>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-outline btn-sm">See Details</button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingMarathonsSection;
