import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AnimatedAuthTitle from "../../components/AnimatedAuthTitle";
import { AuthContext } from "../../context/Authcontext";
import api from "../../services/api";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [mode, setMode] = useState("user");
  const [userType, setUserType] = useState("iiest");

  const [iiestCredentials, setIIESTCredentials] = useState({
    roll: "",
    password: "",
  });

  const [nonIIESTCredentials, setNonIIESTCredentials] = useState({
    email: "",
    password: "",
  });

  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event, type) => {
    const { name, value } = event.target;

    if (type === "iiest") {
      setIIESTCredentials(prev => ({ ...prev, [name]: value }));
    } else if (type === "non-iiest") {
      setNonIIESTCredentials(prev => ({ ...prev, [name]: value }));
    } else {
      setAdminCredentials(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRollChange = (event, type) => {
    const { name, value } = event.target;
    const filteredValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (type === "iiest") {
      setIIESTCredentials(prev => ({ ...prev, [name]: filteredValue }));
    } else if (type === "non-iiest") {
      setNonIIESTCredentials(prev => ({ ...prev, [name]: filteredValue }));
    } else {
      setAdminCredentials(prev => ({ ...prev, [name]: filteredValue }));
    }
  };

  const buildPayload = () => {
    if (mode === "admin") {
      return {
        email: adminCredentials.email.trim().toLowerCase(),
        password: adminCredentials.password,
      };
    }

    if (userType === "iiest") {
      return {
        roll: iiestCredentials.roll.trim().toUpperCase(),
        password: iiestCredentials.password,
      };
    }

    return {
      email: nonIIESTCredentials.email.trim().toLowerCase(),
      password: nonIIESTCredentials.password,
    };
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (isSubmitting) return;

    const payload = buildPayload();

    if (!(payload.email || payload.roll)) {
      toast.error("Please provide your login identifier.");
      return;
    }

    if (!payload.password?.trim()) {
      toast.error("Password is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await api.post("/auth/login", payload);
      const { accessToken, user } = data ?? {};

      if (!accessToken || !user) {
        throw new Error("Unexpected login response from server.");
      }

      login(user, accessToken);

      toast.success(`Welcome back${user?.name ? ", " + user.name.split(" ")[0] : ""}!`);

      const redirectPath = user.role === "admin" || mode === "admin" ? "/admin" : "/dashboard";

      navigate("/welcome", {
        replace: true,
        state: {
          name: user?.name,
          redirectPath,
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Unable to log in. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 32,
          boxShadow: isHovered
            ? "0 12px 42px rgba(25,118,210,0.35)"
            : "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: 12,
          background: isHovered
            ? "linear-gradient(160deg, #1a1f2b 0%, #161616 80%)"
            : "#181818",
          color: "#fff",
          border: isHovered
            ? "1px solid rgba(64,169,255,0.45)"
            : "1px solid #e0e3e9",
          zIndex: 1,
          transition: "all 0.35s ease",
          transform: isHovered
            ? "translateY(-6px) scale(1.01)"
            : "translateY(0) scale(1)",
        }}
      >
        <AnimatedAuthTitle
          text="Login"
          style={{ textAlign: "center", marginBottom: 24 }}
        />

        {mode !== "admin" && (
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
            <label>
              <input
                type="radio"
                className="register-dark-radio"
                checked={userType === "iiest"}
                onChange={() => setUserType("iiest")}
              />{" "}
              IIEST Member
            </label>
            <label>
              <input
                type="radio"
                className="register-dark-radio"
                checked={userType === "non-iiest"}
                onChange={() => setUserType("non-iiest")}
              />{" "}
              Non-IIEST Guest
            </label>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <style>{`
            .register-dark-input {
              background: #232323;
              color: #fff;
              border: 1px solid #444;
              border-radius: 4px;
              width: 100%;
              padding: 12px;
            }
            .register-dark-radio {
              accent-color: #1976d2;
            }
            .register-dark-btn {
              background: #1976d2;
              color: #fff;
              border: none;
              border-radius: 4px;
              width: 100%;
              padding: 12px;
              font-weight: 600;
            }
          `}</style>

          {mode === "admin" ? (
            <>
              <input
                name="email"
                type="email"
                placeholder="Admin Email"
                value={adminCredentials.email}
                onChange={e => handleChange(e, "admin")}
                required
                className="register-dark-input"
              />
              <input
                name="password"
                type="password"
                placeholder="Admin Password"
                value={adminCredentials.password}
                onChange={e => handleChange(e, "admin")}
                required
                className="register-dark-input"
                style={{ marginTop: 12 }}
              />
            </>
          ) : userType === "iiest" ? (
            <>
              <input
                name="roll"
                placeholder="Roll Number"
                value={iiestCredentials.roll}
                onChange={e => handleRollChange(e, "iiest")}
                required
                className="register-dark-input"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={iiestCredentials.password}
                onChange={e => handleChange(e, "iiest")}
                required
                className="register-dark-input"
                style={{ marginTop: 12 }}
              />
            </>
          ) : (
            <>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={nonIIESTCredentials.email}
                onChange={e => handleChange(e, "non-iiest")}
                required
                className="register-dark-input"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={nonIIESTCredentials.password}
                onChange={e => handleChange(e, "non-iiest")}
                required
                className="register-dark-input"
                style={{ marginTop: 12 }}
              />
            </>
          )}

          <button
            type="submit"
            className="register-dark-btn"
            disabled={isSubmitting}
            style={{ marginTop: 16 }}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={() => setMode(prev => (prev === "admin" ? "user" : "admin"))}
            style={{
              marginTop: 12,
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#40a9ff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {mode === "admin" ? "Back to User Login" : "Login as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
