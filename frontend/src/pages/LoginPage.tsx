import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, MessageSquare, Loader2, User } from "lucide-react";
import { useState } from "react";
import AuthImagePattern from "../components/AuthImagePattern";

const Login = () => {
  const schema = z.object({
    username: z
      .string()
      .min(5, { message: "Username must contain at least 5 characters" })
      .max(50),
    password: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters" })
      .max(50),
  });

  type formData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const { isLoggingIn, login } = useAuthStore();

  const validateLogin = (errors: any) => {
    if (errors.fullname) toast.error(errors.fullname?.message!);
    if (errors.email) toast.error(errors.email?.message!);
    if (errors.username) toast.error(errors.username?.message!);
    if (errors.password) toast.error(errors.password?.message!);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen bg-slate-800 grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className=" size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit(login)} className=" space-y-6">
            <div className=" form-control">
              <label className=" label">
                <span className="label-text font-medium"> Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered w-full pl-10  "
                  {...register("username")}
                />
              </div>
            </div>
            <div className=" form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="w-full input input-bordered pl-10  "
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => validateLogin(errors)}
              className="btn  w-full btn-accent text-white "
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};

export default Login;