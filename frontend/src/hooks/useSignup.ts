import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const schema = z.object({
  fullname: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  password: z.string().min(5).max(50),
  confirmPassword: z.string().min(5).max(50),
  gender: z.enum(["male", "female"]),
});

type formData = z.infer<typeof schema>;

const useSignup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const handleSignup = (data: formData) => {
    const controler = new AbortController();

    setIsLoading(true);

    axios
      .post("/api/auth/signup", data, {
        signal: controler.signal,
      })
      .then((res) => {
        localStorage.setItem("online-chat", res.data);
        setAuth(res.data);

        toast.success("Successfully Sign Up");
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

  return { handleSignup, handleSubmit, isLoading, register, errors };
};

export default useSignup;
