import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold mb-4 text-darkBlue animate-pulse">
          404
        </h1>
        <p className="text-xl mb-4 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="text-primary hover:underline text-lg font-medium transition duration-300 ease-in-out"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
