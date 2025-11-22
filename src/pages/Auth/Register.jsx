import React, { useState } from "react";

export default function Register() {
  const [userType, setUserType] = useState("iiestian");
  const [iiestianForm, setIIESTianForm] = useState({
    name: "",
    email: "",
    roll: "",
    department: "",
    password: "",
  });
  const [nonIIESTianForm, setNonIIESTianForm] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    password: "",
  });

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "iiestian") {
      setIIESTianForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setNonIIESTianForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "iiestian") {
      alert("IIESTian Registered: " + JSON.stringify(iiestianForm, null, 2));
    } else {
      alert("Non-IIESTian Registered: " + JSON.stringify(nonIIESTianForm, null, 2));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",

    }}>
      <div style={{
        maxWidth: 400,
        width: "100%",
        padding: 32,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        borderRadius: 12,
        background: "#181818",
        color: "#fff",
        border: "1px solid #e0e3e9",
        zIndex: 1,
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 24, color: "#fff" }}>Registration</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
          <label>
            <input
              type="radio"
              className="register-dark-radio"
              name="userType"
              value="iiestian"
              checked={userType === "iiestian"}
              onChange={() => setUserType("iiestian")}
            />
            IIESTian
          </label>
          <label>
            <input
              type="radio"
              className="register-dark-radio"
              name="userType"
              value="non-iiestian"
              checked={userType === "non-iiestian"}
              onChange={() => setUserType("non-iiestian")}
            />
            Non-IIESTian
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <style>{`
            .register-dark-input {
              background: #232323;
              color: #fff;
              border: 1px solid #444;
              border-radius: 4px;
            }
            .register-dark-input::placeholder {
              color: #aaa;
            }
            .register-dark-radio {
              accent-color: #1976d2;
            }
            .register-dark-btn {
              background: #1976d2;
              color: #fff;
              border: none;
              border-radius: 4px;
              font-weight: 600;
              transition: background 0.2s;
            }
            .register-dark-btn:hover {
              background: #1253a2;
            }
          `}</style>
          {userType === "iiestian" ? (
            <>
              <input
                name="name"
                placeholder="Name"
                value={iiestianForm.name}
                onChange={(e) => handleChange(e, "iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 12, padding: 8 }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={iiestianForm.email}
                onChange={(e) => handleChange(e, "iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 12, padding: 8 }}
              />
              <input
                name="roll"
                placeholder="Roll Number"
                value={iiestianForm.roll}
                onChange={(e) => handleChange(e, "iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 12, padding: 8 }}
              />
              <input
                name="department"
                placeholder="Department"
                value={iiestianForm.department}
                onChange={(e) => handleChange(e, "iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 12, padding: 8 }}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={iiestianForm.password}
                onChange={(e) => handleChange(e, "iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 16, padding: 8 }}
              />
            </>
          ) : (
            <>
              <input
                name="name"
                placeholder="Name"
                value={nonIIESTianForm.name}
                onChange={(e) => handleChange(e, "non-iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 12, padding: 8 }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={nonIIESTianForm.email}
                onChange={(e) => handleChange(e, "non-iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 12, padding: 8 }}
              />
              <input
                name="college"
                placeholder="College Name"
                value={nonIIESTianForm.college}
                onChange={(e) => handleChange(e, "non-iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 12, padding: 8 }}
              />
              <input
                name="course"
                placeholder="Course"
                value={nonIIESTianForm.course}
                onChange={(e) => handleChange(e, "non-iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 12, padding: 8 }}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={nonIIESTianForm.password}
                onChange={(e) => handleChange(e, "non-iiestian")}
                required
                className="register-dark-input" style={{ width: "100%", marginBottom: 16, padding: 8 }}
              />
            </>
          )}
          <button type="submit" className="register-dark-btn" style={{ width: "100%", padding: 10 }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
