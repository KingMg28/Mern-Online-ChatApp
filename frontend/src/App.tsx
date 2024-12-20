import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

function App() {
  const { auth } = useAuth();
  return (
    <div className="px-1 py-3 h-screen flex items-center justify-center md:py-6 md:px-4">
      <Routes>
        <Route
          path="/"
          element={auth ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={auth ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={auth ? <Navigate to={"/"} /> : <SignUp />}
        />
      </Routes>
      <Toaster position="top-left" />
    </div>
  );
}

export default App;
