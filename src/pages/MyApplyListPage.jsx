import { useEffect, useState, Fragment } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

const MyApplyListPage = () => {
  const { user } = useAuth();
  const [applies, setApplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [formData, setFormData] = useState({
    marathonTitle: "",
    marathonDate: "",
    contactNumber: "",
  });

  const fetchApplies = async () => {
    try {
      const res = await axios.get(
        `https://assignment11-server-dun.vercel.app/applies?search=${search}`,
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
        await axios.delete(
          `https://assignment11-server-dun.vercel.app/applies/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        setApplies((prev) => prev.filter((a) => a._id !== id));
        Swal.fire("Deleted!", "আপনার আবেদন ডিলিট হয়েছে।", "success");
      } catch {
        Swal.fire("Error!", "কিছু ভুল হয়েছে", "error");
      }
    }
  };

  const openModal = (app) => {
    setCurrentApp(app);
    setFormData({
      marathonTitle: app.marathonTitle,
      marathonDate: app.marathonDate,
      contactNumber: app.contactNumber,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentApp(null);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://assignment11-server-dun.vercel.app/applies/${currentApp._id}`,
        {
          contactNumber: formData.contactNumber, // শুধু contactNumber পাঠানো হচ্ছে
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      Swal.fire("Updated!", "আপনার তথ্য আপডেট হয়েছে।", "success");
      fetchApplies();
      closeModal();
    } catch (err) {
      console.error(err.response?.data || err.message);
      Swal.fire("Error", "তথ্য আপডেট করতে ব্যর্থ", "error");
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

      {applies.length === 0 && (
        <p className="text-center text-lg text-gray-500 py-10">
          কোনো ম্যারাথনে আবেদন করেননি।
        </p>
      )}

      {applies.length > 0 && (
        <>
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
                    <td>{new Date(a.marathonDate).toLocaleDateString()}</td>
                    <td>
                      <span className="badge badge-outline badge-success">
                        {a.contactNumber}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => openModal(a)}
                        className="btn btn-info btn-xs flex gap-1"
                      >
                        <FaEdit /> Update
                      </button>
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

          <div className="grid md:hidden gap-4">
            {applies.map((a) => (
              <div key={a._id} className="card border border-green-100 shadow-md bg-white p-4 space-y-2">
                <h3 className="font-semibold text-lg text-green-700">
                  {a.marathonTitle}
                </h3>
                <p><span className="font-medium">Start:</span> {new Date(a.marathonDate).toLocaleDateString()}</p>
                <p><span className="font-medium">Contact:</span> {a.contactNumber}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(a)}
                    className="btn btn-info btn-sm"
                  >
                    <FaEdit className="mr-1" /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="btn btn-error btn-sm"
                  >
                    <FaTrash className="mr-1" /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Update Contact Number
                      </Dialog.Title>
                      <div className="mt-4 space-y-3">
                        <input
                          type="text"
                          value={formData.marathonTitle}
                          readOnly
                          className="input input-bordered w-full"
                        />
                        <input
                          type="text"
                          value={new Date(formData.marathonDate).toLocaleDateString()}
                          readOnly
                          className="input input-bordered w-full"
                        />
                        <input
                          type="text"
                          placeholder="Contact Number"
                          value={formData.contactNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, contactNumber: e.target.value })
                          }
                          className="input input-bordered w-full"
                        />
                      </div>
                      <div className="mt-6 flex justify-end gap-2">
                        <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                        <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </div>
  );
};

export default MyApplyListPage;
