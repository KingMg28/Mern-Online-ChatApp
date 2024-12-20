import { FormEvent, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from "../../hooks/useGetAllConversations";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");

  const { conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;
    if (searchInput.trim().length < 3)
      return toast.error("search input must be at least 3 charecter");

    const conversationSearched = conversations.find((c) =>
      c.username.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (conversationSearched) {
      setSelectedConversation(conversationSearched);
    } else {
      toast.error("No Such user found!");
    }
  };
  return (
    <form
      className=" items-center gap-2 hidden md:flex"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-gray-500 border-none text-white"
      >
        <IoSearchSharp className="w-6 h-6" />
      </button>
    </form>
  );
};

export default SearchInput;
