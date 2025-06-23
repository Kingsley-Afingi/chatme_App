
import type { Message } from "../App";


const ChatBubble = ({ message }: { message: Message }) => {
  const isAdmin = message.sender === "A";
  return (
    <div
      className={`p-2 rounded-md my-1 w-fit max-w-xs ${
        isAdmin ? "bg-blue-200 ml-auto" : "bg-green-200"
      }`}
    >
      <p className="text-sm">{message.text}</p>
    </div>
  );
};

export default ChatBubble;

