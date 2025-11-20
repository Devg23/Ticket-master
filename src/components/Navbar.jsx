import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        REBECA
      </Link>

      <nav className="flex items-center gap-6">
        <Link to="/events" className="hover:text-blue-600">
          Events
        </Link>

        {token ? (
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
