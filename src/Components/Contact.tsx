import { useState } from "react";
import ChatBubble from "./ChatBubble";
// import ChatBubble from "./ChatBubble";

interface Message {
  id: number;
  sender: "A" | "B";
  text: string;
}

interface Props {
  messages: Message[];
  addMessage: (msg: Message) => void;
}

const Contact = ({ messages, addMessage }: Props) => {
  const [inputB, setInputB] = useState("");

  const sendMessage = () => {
    if (!inputB.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "B",
      text: inputB,
    };
    addMessage(newMsg);
    setInputB("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-center text-green-600 text-2xl font-bold mb-4">
        Contact Chat
      </h2>

      <div className="max-w-xl mx-auto space-y-2 bg-white p-4 rounded shadow h-[400px] overflow-y-scroll">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="max-w-xl mx-auto mt-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
            placeholder="Contact (User B)"
            className="flex-1 px-3 py-2 rounded border"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
