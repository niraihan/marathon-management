import { useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import useTitle from "../hooks/useTitle";
import { FcGoogle } from "react-icons/fc";
const auth = getAuth(app);

const Register = () => {
  useTitle("MarathonPro | Register");
  const { setLoading, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const JWT_URL = "https://assignment11-server-dun.vercel.app/jwt";
// https://assignment11-server-dun.vercel.app
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    if (!/(?=.*[A-Z])/.test(password))
      return setError("Password must contain an uppercase letter.");
    if (!/(?=.*[a-z])/.test(password))
      return setError("Password must contain a lowercase letter.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    // setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, { displayName: name, photoURL });

        fetch(JWT_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: res.user.email }),
        })
          .then((r) => r.json())
          .then((data) => {
            localStorage.setItem("access-token", data.token);
            setError("");
            Swal.fire("Registered!", "Account created successfully", "success");
            navigate("/", { replace: true });
          });
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire("Error!", err.message, "error");
      })
      // .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(({ user }) => {
        fetch(JWT_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        })
          .then((r) => r.json())
          .then((data) => {
            localStorage.setItem("access-token", data.token);
            Swal.fire("Success!", "Logged in with Google!", "success");
            navigate("/", { replace: true });
          });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-100 via-rose-100 to-zinc-100 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card w-full max-w-md bg-white/90 shadow-xl border border-zinc-200 rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-zinc-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full focus:ring-amber-500"
            required
          />

          <input
            name="photoURL"
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full focus:ring-rose-500"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full focus:ring-amber-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input input-bordered w-full focus:ring-rose-500"
            required
          />

          {error && <p className="text-rose-600 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold"
          >
            Register
          </motion.button>

          <div className="divider">OR</div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleGoogleLogin}
            className="btn w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
          >
           <FcGoogle />  Register with Google
          </motion.button>

          <p className="text-center text-sm mt-2 text-zinc-600">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
