import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  return (
    <div className="mt-auto p-2 ps-1 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
      {loading ? (
        <span className=" loading loading-spinner"></span>
      ) : (
        <BiLogOut
          onClick={logout}
          className="w-6 h-6 text-white cursor-pointer"
        />
      )}
    </div>
  );
};

export default LogoutButton;
