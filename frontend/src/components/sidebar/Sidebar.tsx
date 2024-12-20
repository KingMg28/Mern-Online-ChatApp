import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="w-[48px] sm:w-fit bg-gray-800 border-r border-slate-700 p-1 flex flex-col md:p-2   ">
      <SearchInput />
      <div className=" divider m-1 px-3  hidden md:block"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
