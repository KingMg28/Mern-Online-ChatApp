import { FormEvent, useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { useChatStore } from "../../store/useChatStore";

const SidebarSearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearchUsers, setShowSearchUsers] = useState(false);

  const { users, setSelectedUser, getUsers, searchedUsers, SetSearchedUsers } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;
    if (searchInput.trim().length < 3)
      return toast.error("search input must be at least 3 charecter");

    const conversationSearched = users.filter((c) =>
      c.username.toLowerCase().includes(searchInput.toLowerCase().trim())
    );

    if (conversationSearched) {
      SetSearchedUsers(conversationSearched);
    } else {
      toast.error("No Such user found!");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target instanceof Node && !event.target.closest("form")) {
        setShowSearchUsers(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      className=" items-center gap-2 hidden md:flex relative"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onFocus={() => setShowSearchUsers(true)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-gray-500 border-none text-white"
      >
        <IoSearchSharp className="w-6 h-6" />
      </button>
      {showSearchUsers && searchedUsers && (
        <div className="dropdown dropdown-open absolute mt-14">
          <ul
            tabIndex={0}
            className="dropdown-content menu relative bg-base-100 rounded-box z-[1] w-52 p-2 shadow border border-gray-700"
          >
            {searchedUsers.map((user) => (
              <div
                key={user._id}
                className="btn flex items-center justify-start  m-1 p-0 flex-nowrap "
                onClick={() => setSelectedUser(user)}
                onBlur={() => {
                  setShowSearchUsers(false);
                  setSearchInput("");
                }}
              >
                <div className={` avatar `}>
                  <div className="w-8 rounded-full mx-3">
                    <img src={user.profilePic} alt={"user Profile"} />
                  </div>
                </div>
                <span>{user.username}</span>
              </div>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SidebarSearchInput;
