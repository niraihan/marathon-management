import { Link } from "react-router-dom";
// import useTitle from "../hook/useTitle";

const NotFound = () => {
//   useTitle("Plants - Not Found");
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-green-50 px-4">
      <img
        src="https://i.ibb.co/LDyTb6nL/What-is-404-error.jpg"
        alt="Not Found"
        className="w-80 mb-8"
      />
      <h1 className="text-5xl font-bold text-green-700 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The plant you're looking for doesn't exist in our garden.
      </p>
      <Link to="/">
        <button className="btn btn-success text-white">🌿 Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;