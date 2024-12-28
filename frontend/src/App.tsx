import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
// import { useAuth } from "./context/AuthContext";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
// import SettingPage from "./pages/SettingPage";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  // const { auth } = useAuth();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
        />
        {/* <Route path="/settings" element={<SettingPage />} /> */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>

      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
