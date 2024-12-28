import React, { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { X, Image, Send } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { sendMessage, isMessageSending } = useChatStore();

  const handleImgChane = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files![0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImg = () => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !imgPreview) return;
    try {
      sendMessage({
        text: text.trim(),
        image: imgPreview,
      });

      // Clear form
      setText("");
      setImgPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-2  w-full">
      {imgPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImg}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            className="w-full input input-bordered border rounded-lg block p-5  bg-gray-800 border-gray-700 text-white input-md sm:input-sm"
            placeholder="Text a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImgChane}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle border-gray-700 size-12
                     ${imgPreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className=" "
          disabled={!text.trim() && !imgPreview}
        >
          {isMessageSending ? (
            <span className=" btn btn-sm btn-circle loading-spinner loading"></span>
          ) : (
            <div className=" btn btn-sm btn-circle border-gray-700 size-12">
              <Send size={22} />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
