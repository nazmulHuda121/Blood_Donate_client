// NotFound.jsx
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-gray-500">Page not found</p>
      <Link to="/" className="btn btn-error mt-6">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
