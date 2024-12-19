import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext, AuthType } from "../context/AuthContext";
import axios from "axios";

const useLogout = () => {
  const [loading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const logout = () => {
    const controler = new AbortController();

    setIsLoading(true);

    axios
      .post("/api/auth/logout", "", {
        signal: controler.signal,
      })
      .then(() => {
        localStorage.removeItem("online-chat");
        setAuth(null as AuthType);

        toast.success("Successfully Log out");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
        setIsLoading(false);
      });
    return () => controler.abort();
  };

  return { loading, logout };
};
export default useLogout;
