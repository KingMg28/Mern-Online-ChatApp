import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const { handleSubmit, handleSignup, register, isLoading, errors } =
    useSignup();

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-2xl bg-gray-600 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15  border  border-solid border-slate-700">
        <h1 className=" text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className=" text-blue-400 ms-2">ChatApp </span>
        </h1>

        <form onSubmit={handleSubmit(handleSignup)}>
          <div>
            <label className=" label p-2">
              <span className="text-base label-text"> Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Fullname"
              className="w-full input input-bordered h-10  "
              {...register("fullname")}
            />
            <label htmlFor="password" className=" text-yellow-300">
              {errors.fullname?.message}
            </label>
          </div>

          <div>
            <label className=" label p-2">
              <span className="text-base label-text"> Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full input input-bordered h-10  "
              {...register("username")}
            />
            <label htmlFor="password" className=" text-yellow-300">
              {errors.username?.message}
            </label>
          </div>

          <div>
            <label className=" label p-2">
              <span className="text-base label-text"> Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full input input-bordered h-10  "
              {...register("password")}
            />
            <label htmlFor="password" className=" text-yellow-300">
              {errors.password?.message}
            </label>
          </div>

          <div>
            <label className=" label p-2">
              <span className="text-base label-text"> Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10  "
              {...register("confirmPassword")}
            />
            <label htmlFor="password" className=" text-yellow-300">
              {errors.confirmPassword?.message}
            </label>
          </div>
          {/* 
          <div className="flex ">
            <div className=" form-control">
              <label className=" label gap-2 cursor-pointer">
                <span className=" label-text">Male</span>
                <input
                  type="checkbox"
                  className=" checkbox border-slate-600 "
                />
              </label>
            </div>
            <div>
              <label className=" label gap-2 cursor-pointer">
                <span className=" label-text">Female</span>
                <input
                  type="checkbox"
                  className=" checkbox border-slate-600 "
                />
              </label>
            </div>
          </div> */}

          <div>
            <label className=" label p-2">
              <span className="text-base label-text"> Gender </span>
            </label>
            <select
              className="select select-bordered w-full h-10"
              {...register("gender")}
            >
              <option disabled></option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
            <label htmlFor="password" className=" text-yellow-300">
              {errors.gender?.message}
            </label>
          </div>

          <Link
            to={"/login"}
            className=" text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
          >
            Already have an account?
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
              <button
                type="submit"
                className="btn btn-accent text-white btn-block btn-sm h-10 mt-2"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
