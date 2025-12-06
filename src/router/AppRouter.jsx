import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import Events from "../pages/Events/Events";
import Eventdetail from "../pages/Events/Eventdetail";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";
import WelcomeAnimation from "../pages/Welcome/WelcomeAnimation";
import Navbar from "../components/Navbar";

function RouterContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/welcome"];  // Correct array
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Eventdetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/welcome" element={<WelcomeAnimation />} />
      </Routes>
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
}
