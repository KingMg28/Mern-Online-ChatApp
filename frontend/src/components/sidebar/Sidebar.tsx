import { useEffect } from "react";
import SideBarConversation from "./SideBarConversation";
import SidebarSearchInput from "./SideBarSearchInput";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getSidebarUsers, sidebarUsers, isUsersSidbarLoading } =
    useChatStore();

  useEffect(() => {
    getSidebarUsers();
  }, [getSidebarUsers]);

  return (
    <aside className="h-full w-12 sm:w-fit bg-gray-800 border-r border-slate-700 p-1 flex flex-col md:p-2 transition-all duration-200   ">
      <SidebarSearchInput />
      <div className=" divider m-1 px-3  hidden md:block"></div>

      <div className="py-2 flex flex-col">
        {isUsersSidbarLoading && <SidebarSkeleton />}
        {!isUsersSidbarLoading &&
          sidebarUsers?.map((conversation, indexId) => (
            <SideBarConversation
              key={conversation._id}
              conversation={conversation}
              islastId={indexId === sidebarUsers.length - 1}
            />
          ))}
        {sidebarUsers.length === 0 && !isUsersSidbarLoading && (
          <div className="flex items-center justify-center text-gray-400">
            <span className=" text-center text-wrap w-60 hidden sm:block">
              Search and Find Your Friends Start Conversation
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
