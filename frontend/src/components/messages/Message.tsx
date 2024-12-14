const Message = () => {
  return (
    <div className=" chat chat-end">
      <div className=" chat-image avatar">
        <div className=" w-10 rounded-full">
          <img
            src="https://cdn.discordapp.com/attachments/1110655740147941396/1315717560595124244/download_8.jpeg?ex=675f0477&is=675db2f7&hm=cc53903dec9fbf3a076b61ad825b8556299b0954f9a42720ef99cacbfe68d1d0&"
            alt="test"
          />
        </div>
      </div>
      <div className=" chat-bubble text-white bg-blue-500">Hi! What's upp?</div>
      <div className=" chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
    </div>
  );
};

export default Message;
