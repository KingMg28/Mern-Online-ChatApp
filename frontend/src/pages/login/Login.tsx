import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { errors, handleLogin, handleSubmit, isLoading, register } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15">
        <h1 className=" text-3xl font-semibold text-center text-gray-300">
          Login
          <span className=" text-blue-400 ms-2">ChatApp </span>
        </h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className=" label p-2">
              <span className="text-base label-text"> Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="w-full input input-bordered h-10  "
              {...register("username")}
            />
            <label className=" text-yellow-300">
              {errors.username?.message}
            </label>
          </div>

          <div>
            <label className=" label p-2">
              <span className="text-base label-text"> Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="w-full input input-bordered h-10  "
              {...register("password")}
            />
            <label className=" text-yellow-300">
              {errors.password?.message}
            </label>
          </div>

          <Link
            to={"/signup"}
            className=" text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            {isLoading ? (
              <button
                className="btn btn-accent text-white btn-block btn-sm h-10 mt-2"
                disabled
              >
                <span className="loading loading-spinner "></span>
                loading
              </button>
            ) : (
              <button className="btn btn-info text-white btn-block btn-sm mt-2">
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
