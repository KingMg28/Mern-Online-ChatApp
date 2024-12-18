import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";

const schema = z.object({
  username: z.string().min(5).max(50),
  password: z.string().min(5).max(50),
});

type formData = z.infer<typeof schema>;

const useLogin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const handleLogin = (data: formData) => {
    const controler = new AbortController();

    setIsLoading(true);
    axios
      .post("/api/auth/login", data, {
        signal: controler.signal,
      })
      .then((res) => {
        localStorage.setItem("online-chat", JSON.stringify(res.data));
        setAuth(res.data);

        toast.success("Successfully Login");
        setIsLoading(false);
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
        setIsLoading(false);
      });

    return () => controler.abort();
  };

  return { handleSubmit, handleLogin, register, errors, isLoading };
};

export default useLogin;
