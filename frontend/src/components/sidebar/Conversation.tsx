const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className=" avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://cdn.discordapp.com/attachments/1110655740147941396/1315717560595124244/download_8.jpeg?ex=675f0477&is=675db2f7&hm=cc53903dec9fbf3a076b61ad825b8556299b0954f9a42720ef99cacbfe68d1d0&"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-4 justify-between">
            <p className=" font-bold text-gray-200 ">King MG</p>
            <span className=" text-xl">😱</span>
          </div>
        </div>
      </div>
      <div className=" divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
