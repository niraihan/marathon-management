import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const JWT_URL = "http://localhost:5000/jwt";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        fetch(JWT_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: res.user.email }),
        })
          .then((r) => r.json())
          .then((data) => {
            localStorage.setItem("access-token", data.token);
            Swal.fire("Success!", "Logged in successfully!", "success");
            navigate(from, { replace: true });
          });
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        fetch(JWT_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: res.user.email }),
        })
          .then((r) => r.json())
          .then((data) => {
            localStorage.setItem("access-token", data.token);
            Swal.fire("Success!", "Logged in with Google!", "success");
            navigate(from, { replace: true });
          });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-amber-100 via-rose-100 to-zinc-100 px-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="card w-full max-w-md bg-white bg-opacity-90 shadow-xl border border-zinc-200 rounded-xl p-8"
      >
        <h2 className="text-3xl font-extrabold text-center text-zinc-800 mb-4">
          Welcome Back!
        </h2>
        {/* <h2 className="text-3xl font-bold text-center text-zinc-800 mb-6">Login</h2> */}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full focus:ring-amber-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="submit"
            className="btn w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold"
          >
            Login
          </motion.button>

          <Link
            to="/forgot-password"
            state={{ email }}
            className="text-xs block text-center text-rose-600 hover:underline"
          >
            Forgot Password?
          </Link>

          <div className="divider">OR</div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={handleGoogleLogin}
            className="btn w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
          >
            Login with Google
          </motion.button>

          <p className="text-center text-sm mt-2 text-zinc-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-rose-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
