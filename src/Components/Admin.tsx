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

const Admin = ({ messages, addMessage }: Props) => {
  const [inputA, setInputA] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const sendMessage = () => {
    if (!inputA.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "A",
      text: inputA,
    };
    addMessage(newMsg);
    setInputA("");
  };

  const handleLogin = () => {
    if (password === "kingsley") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-center text-blue-600 text-2xl font-bold mb-4">
        Admin Chat
      </h2>

      {!isAuthenticated ? (
        <div className="max-w-sm mx-auto bg-white p-4 rounded shadow">
          <h3 className="text-lg mb-2">Admin Login</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-3 py-2 border rounded mb-2"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white w-full py-2 rounded"
          >
            Login
          </button>
        </div>
      ) : (
        <>
          <div className="max-w-xl mx-auto space-y-2 bg-white p-4 rounded shadow h-[200px] overflow-y-scroll">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
          </div>

          <div className="max-w-xl mx-auto mt-6">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputA}
                onChange={(e) => setInputA(e.target.value)}
                placeholder="Admin (User A)"
                className="flex-1 px-3 py-2 rounded border"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;

