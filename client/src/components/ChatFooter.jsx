const ChatFooter = () => {
  return (
    <div className="flex">
      <textarea
        className=" w-100 min-h-10 max-h-40 resize-none overflow-y-auto wrap-break whitespace-pre-wrap rounded-lg px-1 py-1 outline-none border "
        onChange={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />
      <button className="ml-8">Send</button>
    </div>
  );
};

export default ChatFooter;
