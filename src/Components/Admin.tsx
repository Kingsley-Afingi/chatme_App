
// import { useState } from "react";
// import ChatBubble from "./ChatBubble";
// import type { Message } from "../App";

// interface Props {
//   messages: Message[];
//   addMessage: (msg: Omit<Message, "timestamp">) => void;
// }

// const Admin = ({ messages, addMessage }: Props) => {
//   const [input, setInput] = useState("");
//   const [authenticated, setAuthenticated] = useState(false);
//   const [password, setPassword] = useState("");

//   const handleSend = () => {
//     if (input.trim()) {
//       addMessage({ sender: "A", text: input });
//       setInput("");
//     }
//   };

//   const login = () => {
//     if (password === "kingsley") {
//       setAuthenticated(true);
//     } else {
//       alert("Wrong password!");
//     }
//   };

//   if (!authenticated) {
//     return (
//       <div className="p-6 flex items-center justify-center flex-col space-y-2">
//         <h2 className="text-lg font-bold">THIS IS FOR ADMIN ONLY</h2>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Enter admin password"
//           className="border px-2 py-1"
//         />
//         <button onClick={login} className="bg-blue-600 text-white px-4 py-1 ml-2 rounded">
//           Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 ">
//       <h2 className="text-xl  font-bold text-blue-600">Admin Chat</h2>
//       <div className="bg-white shadow rounded p-3 max-w-xl w-[800px] mx-auto h-[250px] overflow-y-scroll my-4">
//         {messages.map((msg) => (
//           <ChatBubble key={msg.id} message={msg} />
//         ))}
//       </div>

//       <div className="max-w-xl mx-auto flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="border px-2 py-1 flex-1 rounded"
//           placeholder="Message from Admin"
//         />
//         <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Admin;



import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";

export interface Message {
  id?: string;
  sender: "A" | "B";
  text: string;
  timestamp: any;
}

const Admin = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, "id">),
      }));
      setMessages(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        sender: "A",
        text: input,
        timestamp: Timestamp.now(),
      });
      setInput("");
    }
  };

  const login = () => {
    if (password === "kingsley") {
      setAuthenticated(true);
    } else {
      alert("Wrong password!");
    }
  };

  if (!authenticated) {
    return (
      <div className="p-6 flex items-center justify-center flex-col space-y-2">
        <h2 className="text-lg font-bold">THIS IS FOR ADMIN ONLY</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="border px-2 py-1"
        />
        <button onClick={login} className="bg-blue-600 text-white px-4 py-1 ml-2 rounded">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-blue-600">Admin Chat</h2>
      <div className="bg-white shadow rounded p-3 max-w-xl mx-auto h-[250px] overflow-y-scroll my-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </div>

      <div className="max-w-xl mx-auto flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-2 py-1 flex-1 rounded"
          placeholder="Message from Admin"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Admin;

