import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const MyMarathonListPage = () => {
  const [user] = useAuthState(auth);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMarathon, setEditingMarathon] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    startRegistrationDate: "",
    endRegistrationDate: "",
    marathonStartDate: "",
    runningDistance: "10k",
    description: "",
    marathonImage: "",
  });
console.log(marathons)
  const fetchMyMarathons = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/mymarathons", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to fetch");
      }

      const data = await res.json();
      setMarathons(Array.isArray(data) ? data : []);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
      setMarathons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchMyMarathons();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/marathons/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", data.message, "success");
              fetchMyMarathons();
            } else {
              Swal.fire("Error", data.message || "Delete failed", "error");
            }
          });
      }
    });
  };

  const openEditModal = (marathon) => {
    setEditingMarathon(marathon);
    setFormData({
      title: marathon.title,
      location: marathon.location,
      startRegistrationDate: marathon.startRegistrationDate.slice(0, 10),
      endRegistrationDate: marathon.endRegistrationDate.slice(0, 10),
      marathonStartDate: marathon.marathonStartDate.slice(0, 10),
      runningDistance: marathon.runningDistance,
      description: marathon.description,
      marathonImage: marathon.marathonImage,
    });
  };

  const closeEditModal = () => {
    setEditingMarathon(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/marathons/${editingMarathon._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Success", data.message, "success");
          closeEditModal();
          fetchMyMarathons();
        } else {
          Swal.fire("Error", data.message || "Update failed", "error");
        }
      });
  };

  if (loading) return <div className="text-center mt-10">Loading…</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">My Marathon List</h2>

      {marathons.length === 0 ? (
        <p>No marathons found. Add some!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Start Reg</th>
                <th>End Reg</th>
                <th>Marathon Date</th>
                <th>Distance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marathons.map((m) => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.location}</td>
                  <td>{new Date(m.startRegistrationDate).toLocaleDateString()}</td>
                  <td>{new Date(m.endRegistrationDate).toLocaleDateString()}</td>
                  <td>{new Date(m.marathonDate
).toLocaleDateString()}</td>
                  <td>{m.distance}</td>
                  <td className="space-x-2">
                    <button className="btn btn-sm btn-warning" onClick={() => openEditModal(m)}>Update</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(m._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingMarathon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Update Marathon</h3>
            <form onSubmit={handleUpdate} className="space-y-4">

              <input type="text" name="title" value={formData.title} onChange={handleFormChange} className="input input-bordered w-full" required placeholder="Title" />
              <input type="text" name="location" value={formData.location} onChange={handleFormChange} className="input input-bordered w-full" required placeholder="Location" />
              <input type="date" name="startRegistrationDate" value={formData.startRegistrationDate} onChange={handleFormChange} className="input input-bordered w-full" required />
              <input type="date" name="endRegistrationDate" value={formData.endRegistrationDate} onChange={handleFormChange} className="input input-bordered w-full" required />
              <input type="date" name="marathonStartDate" value={formData.marathonStartDate} onChange={handleFormChange} className="input input-bordered w-full" required />
              <select name="runningDistance" value={formData.runningDistance} onChange={handleFormChange} className="select select-bordered w-full">
                <option value="3k">3k</option>
                <option value="10k">10k</option>
                <option value="25k">25k</option>
              </select>
              <textarea name="description" value={formData.description} onChange={handleFormChange} className="textarea textarea-bordered w-full" placeholder="Description" />
              <input type="text" name="marathonImage" value={formData.marathonImage} onChange={handleFormChange} className="input input-bordered w-full" placeholder="Image URL" />

              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeEditModal} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMarathonListPage;
