// pages/ForgotPassword.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import useTitle from "../hooks/useTitle";

const ForgotPassword = () => {
  useTitle("MarathonPro | ForgotPassword");
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();

  // Login পেজ থেকে যদি state‑এ ইমেইল আসে, সেটাই প্রি‑ফিল
  const [email, setEmail] = useState(location.state?.email || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      Swal.fire(
        "Password Reset Email Sent",
        "দয়া করে আপনার ইনবক্স/স্প্যাম ফোল্ডার চেক করুন।",
        "success"
      );
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-sm shadow-md bg-base-100 p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
