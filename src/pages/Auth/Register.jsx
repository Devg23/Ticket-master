import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AnimatedAuthTitle from "../../components/AnimatedAuthTitle";
import api from "../../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("iiestian");

  const [iiestianForm, setIIESTianForm] = useState({
    name: "",
    email: "",
    roll: "",
    password: "",
    confirm_password: "",
  });

  const [nonIIESTianForm, setNonIIESTianForm] = useState({
    name: "",
    email: "",
    college: "",
    password: "",
    confirm_password: "",
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForms = () => {
    setIIESTianForm({
      name: "",
      email: "",
      roll: "",
      password: "",
      confirm_password: "",
    });
    setNonIIESTianForm({
      name: "",
      email: "",
      college: "",
      password: "",
      confirm_password: "",
    });
  };

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "iiestian") {
      setIIESTianForm(prev => ({ ...prev, [name]: value }));
    } else {
      setNonIIESTianForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRollChange = (e, formType) => {
    const filteredValue = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    if (formType === "iiestian") {
      setIIESTianForm(prev => ({ ...prev, roll: filteredValue }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) return;

    const activeForm = userType === "iiestian" ? iiestianForm : nonIIESTianForm;

    if (!activeForm.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!activeForm.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (!activeForm.password.trim()) {
      toast.error("Password is required.");
      return;
    }

    if (activeForm.password !== activeForm.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    if (userType === "iiestian" && !activeForm.roll.trim()) {
      toast.error("Roll number is required for IIESTians.");
      return;
    }

    if (userType === "non-iiestian" && !activeForm.college.trim()) {
      toast.error("College name is required for Non-IIESTians.");
      return;
    }

    const payload = {
      name: activeForm.name.trim(),
      email: activeForm.email.trim().toLowerCase(),
      password: activeForm.password,
      iiestian: userType === "iiestian",
    };

    if (userType === "iiestian") {
      payload.roll = activeForm.roll.trim().toUpperCase();
    } else {
      payload.college = activeForm.college.trim();
    }

    setIsSubmitting(true);

    try {
      await api.post("/auth/signup", payload);
      toast.success("Registration successful! Please log in.");
      resetForms();
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed. Please try again.";
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
          borderRadius: 12,
          background: "#181818",
          color: "#fff",
          border: "1px solid #2d2d30",
          boxShadow: isHovered
            ? "0 12px 42px rgba(25,118,210,0.35)"
            : "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <>
          <AnimatedAuthTitle text="Registration" />

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
            <label>
              <input
                type="radio"
                checked={userType === "iiestian"}
                onChange={() => setUserType("iiestian")}
              />{" "}
              IIESTian
            </label>
            <label>
              <input
                type="radio"
                checked={userType === "non-iiestian"}
                onChange={() => setUserType("non-iiestian")}
              />{" "}
              Non-IIESTian
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={(userType === "iiestian" ? iiestianForm : nonIIESTianForm).name}
              onChange={e => handleChange(e, userType)}
              className="register-dark-input"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={(userType === "iiestian" ? iiestianForm : nonIIESTianForm).email}
              onChange={e => handleChange(e, userType)}
              className="register-dark-input"
              style={{ marginTop: 12 }}
            />
            {userType === "iiestian" && (
              <input
                name="roll"
                placeholder="Roll Number"
                value={iiestianForm.roll}
                onChange={e => handleRollChange(e, userType)}
                className="register-dark-input"
                style={{ marginTop: 12 }}
              />
            )}
            {userType === "non-iiestian" && (
              <input
                name="college"
                placeholder="College"
                value={nonIIESTianForm.college}
                onChange={e => handleChange(e, userType)}
                className="register-dark-input"
                style={{ marginTop: 12 }}
              />
            )}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={(userType === "iiestian" ? iiestianForm : nonIIESTianForm).password}
              onChange={e => handleChange(e, userType)}
              className="register-dark-input"
              style={{ marginTop: 12 }}
            />
            <input
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              value={(userType === "iiestian" ? iiestianForm : nonIIESTianForm).confirm_password}
              onChange={e => handleChange(e, userType)}
              className="register-dark-input"
              style={{ marginTop: 12 }}
            />

            <button disabled={isSubmitting} style={{ marginTop: 16 }}>
              {isSubmitting ? "Submitting..." : "Continue"}
            </button>
          </form>
        </>
      </div>
    </div>
  );
}
