import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import api, { setAuthHeader } from "../services/api";

export default function Navbar() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse stored user", error);
      return null;
    }
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const displayName = (() => {
    if (!user) return "Dashboard";
    if (typeof user.name === "string" && user.name.trim()) {
      return user.name.trim().split(" ")[0];
    }
    if (typeof user.email === "string" && user.email.trim()) {
      return user.email.trim();
    }
    if (typeof user.roll === "string" && user.roll.trim()) {
      return user.roll.trim();
    }
    return "Dashboard";
  })();

  useEffect(() => {
    const syncAuth = () => {
      setToken(localStorage.getItem("token"));
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Failed to parse stored user", error);
        setUser(null);
      }
    };

    window.addEventListener("storage", syncAuth);
    window.addEventListener("authchange", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authchange", syncAuth);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Unable to logout. Please try again.");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthHeader(null);
      setToken(null);
      setUser(null);
      setIsLoggingOut(false);
      toast.success("Logged out successfully");
      window.dispatchEvent(new Event("authchange"));
      navigate("/login");
    }
  };

  return (
    <header
      style={{
        background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        padding: "16px 32px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        borderBottom: "1px solid #222",
        minHeight: 24,
        height: 24,
        boxSizing: "border-box",
      }}
      className="w-full flex justify-between items-center relative"
    >
      {/* LEFT SECTION — Home */}
      <nav>
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-widest"
          style={{
            color: "#40a9ff",
            letterSpacing: 10,
            fontFamily: "Montserrat, sans-serif",
            textShadow: "0 2px 8px rgba(64,169,255,0.15)",
          }}
        >
          <FaHome size={20} />
        </Link>

      {/* CENTER SECTION — Events */}
      <Link
        to="/events"
        className="text-lg font-medium transition-colors duration-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ color: "#fff" }}
        onMouseOver={(e) => (e.target.style.color = "#40a9ff")}
        onMouseOut={(e) => (e.target.style.color = "#fff")}
      >
        Events
      </Link>

      {/* RIGHT SECTION — Login/Register/Dashboard */}
      {token ? (
        <div style={{ display: "flex", gap: 12, marginLeft: "auto", alignItems: "center" }}>
          <Link
            to="/admin"
            className="text-sm font-semibold"
            style={{
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 999,
              padding: "8px 16px",
              letterSpacing: 0.4,
              transition: "all 0.2s ease",
            }}
            onMouseOver={event => {
              event.currentTarget.style.color = "#40a9ff";
              event.currentTarget.style.borderColor = "#40a9ff";
            }}
            onMouseOut={event => {
              event.currentTarget.style.color = "#fff";
              event.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
            }}
          >
            Admin Portal
          </Link>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 rounded-full font-semibold shadow-lg flex items-center gap-2"
            style={{
              background: "linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(25,118,210,0.2)",
              whiteSpace: "nowrap",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={event => (event.currentTarget.style.background = "#1253a2")}
            onMouseOut={event =>
              (event.currentTarget.style.background =
                "linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)")
            }
          >
            <FaUserCircle size={24} />
            <span style={{ fontWeight: 600 }}>{displayName}</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.35)",
              background: "transparent",
              color: "#fff",
              cursor: isLoggingOut ? "not-allowed" : "pointer",
              opacity: isLoggingOut ? 0.6 : 1,
            }}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 12, marginLeft: "auto", alignItems: "center" }}>
          <Link
            to="/admin"
            className="text-lg font-medium transition-colors duration-200"
            style={{ color: "#fff" }}
            onMouseOver={e => (e.target.style.color = "#40a9ff")}
            onMouseOut={e => (e.target.style.color = "#fff")}
          >
            Admin
          </Link>
          <Link
            to="/login"
            className="text-lg font-medium transition-colors duration-200"
            style={{ color: "#fff" }}
            onMouseOver={e => (e.target.style.color = "#40a9ff")}
            onMouseOut={e => (e.target.style.color = "#fff")}
          >
            | Login |
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-full font-semibold shadow-lg"
            style={{
              background: "linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)",
              color: "#fff",
              boxShadow: "0 2px 8px rgba(25,118,210,0.2)",
              whiteSpace: "nowrap",
            }}
            onMouseOver={e => (e.target.style.background = "#1253a2")}
            onMouseOut={e =>
              (e.target.style.background =
                "linear-gradient(90deg, #1976d2 0%, #40a9ff 100%)")
            }
          >
            Register
          </Link>
        </div>
      )}
      </nav>
    </header>
  );
}
