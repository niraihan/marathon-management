import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch, FaTrash } from "react-icons/fa";

const MyApplyListPage = () => {
  const { user } = useAuth();
  const [applies, setApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchApplies = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/applies?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      const result = Array.isArray(res.data) ? res.data : res.data.data || [];
      setApplies(result);
    } catch (err) {
      console.error("Failed to fetch applies", err);
      Swal.fire("Error", "অ্যাপ্লিকেশন লোড করা যায়নি", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchApplies, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    fetchApplies();
  }, []);

  const handleDelete = async (id) => {
    const ok = await Swal.fire({
      title: "Are you sure?",
      text: "ডিলিট করলে আর ফিরে পাবেন না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (ok.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/applies/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setApplies((prev) => prev.filter((a) => a._id !== id));
        Swal.fire("Deleted!", "আপনার আবেদন ডিলিট হয়েছে।", "success");
      } catch {
        Swal.fire("Error!", "কিছু ভুল হয়েছে", "error");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-gradient-to-br from-green-50 to-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center text-green-700">
        🎯 My Applied Marathons
      </h2>

      {/* search */}
      <div className="flex justify-center">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by marathon title…"
            className="input input-bordered pl-10 w-full shadow-md bg-white focus:ring-2 focus:ring-green-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* no data */}
      {applies.length === 0 && (
        <p className="text-center text-lg text-gray-500 py-10">
          কোনো ম্যারাথনে আবেদন করেননি।
        </p>
      )}

      {/* TABLE for md+ */}
      {applies.length > 0 && (
        <>
          {/* desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="table table-zebra">
              <thead className="bg-green-100 text-green-800">
                <tr className="text-base">
                  <th>Title</th>
                  <th>Start Date</th>
                  <th>Contact</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {applies.map((a) => (
                  <tr key={a._id} className="hover">
                    <td>{a.marathonTitle}</td>
                    <td>
                      {new Date(a.marathonDate).toLocaleDateString()}
                    </td>
                    <td>
                      <span className="badge badge-outline badge-success">
                        {a.contactNumber}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(a._id)}
                        className="btn btn-error btn-xs flex gap-1"
                      >
                        <FaTrash /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile cards */}
          <div className="grid md:hidden gap-4">
            {applies.map((a) => (
              <div
                key={a._id}
                className="card border border-green-100 shadow-md bg-white p-4 space-y-2"
              >
                <h3 className="font-semibold text-lg text-green-700">
                  {a.marathonTitle}
                </h3>
                <p>
                  <span className="font-medium">Start:</span>{" "}
                  {new Date(a.marathonDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Contact:</span>{" "}
                  {a.contactNumber}
                </p>
                <button
                  onClick={() => handleDelete(a._id)}
                  className="btn btn-error btn-sm w-max mt-2"
                >
                  <FaTrash className="mr-1" /> Cancel
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyApplyListPage;
