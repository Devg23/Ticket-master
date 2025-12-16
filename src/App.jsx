import AppRouter from "./router/AppRouter.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRouter />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </>
  );
}

export default App;
