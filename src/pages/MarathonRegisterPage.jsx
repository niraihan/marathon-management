import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const MarathonRegisterPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    additionalInfo: "",
  });

  /* ম্যারাথন ডেটা লোড */
  useEffect(() => {
    const fetchMarathon = async () => {
      try {
        const res = await fetch(
          `https://assignment11-server-dun.vercel.app/marathons/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        const data = await res.json();
        setMarathon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarathon();

    // ইউজার থাকলে ইমেইল অটোসেট
    if (user) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [id, user]);

  /*  ইনপুট বদল */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*  সাবমিট */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ফিল্ডভ্যালিডেশন
    if (!formData.firstName || !formData.lastName || !formData.contactNumber) {
      return Swal.fire("Error", "সব আবশ্যিক ঘর পূরণ করুন", "error");
    }

    const registrationData = {
      marathonId: marathon._id,
      marathonTitle: marathon.title,
      marathonDate: marathon.marathonDate,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      additionalInfo: formData.additionalInfo,
      createdAt: new Date(),
      userId: user.uid,
    };

    try {
      const res = await fetch("https://assignment11-server-dun.vercel.app/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(registrationData),
      });
      const data = await res.json();

      /* success/insertedId/acknowledged—যাএক্সপেক্টকরি না কেন  */
      if (data.success || data.insertedId || data.acknowledged) {
        Swal.fire("Success", "রেজিস্ট্রেশন সম্পন্ন!", "success").then(() =>
          navigate("/dashboard/my-applications", { replace: true })
        );
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "কিছু ভুল হয়েছে", "error");
    }
  };

  /* ‑‑ UI রেন্ডার অংশ ‑‑ */
  if (loading) return <div className="text-center mt-10">Loading…</div>;
  if (!marathon) return <div className="text-center mt-10">Marathon Not Found</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Register for {marathon.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Marathon Title */}
        <div>
          <label className="block font-semibold mb-1">Marathon Title</label>
          <input
            type="text"
            value={marathon.title}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block font-semibold mb-1">Marathon Start Date</label>
          <input
            type="text"
            value={new Date(marathon.marathonDate).toLocaleDateString()}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block font-semibold mb-1">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold mb-1">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block font-semibold mb-1">Contact Number *</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Additional Info */}
        <div>
          <label className="block font-semibold mb-1">Additional Info</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default MarathonRegisterPage;
