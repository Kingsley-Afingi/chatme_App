
// import { useState } from "react";
// import ChatBubble from "./ChatBubble";
// import type { Message } from "../App";

// interface Props {
//   messages: Message[];
//   addMessage: (msg: Omit<Message, "timestamp">) => void;
// }

// const Contact = ({ messages, addMessage }: Props) => {
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (input.trim()) {
//       addMessage({ sender: "B", text: input });
//       setInput("");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold text-green-600">Contact Chat</h2>
//       <div className="bg-white shadow rounded p-3 max-w-xl mx-auto h-[250px] overflow-y-scroll my-4">
//         {messages.map((msg) => (
//           <ChatBubble key={msg.id} message={msg} />
//         ))}
//       </div>

//       <div className="max-w-xl mx-auto flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="border px-2 py-1 flex-1 rounded"
//           placeholder="Message from Contact"
//         />
//         <button onClick={handleSend} className="bg-green-600 text-white px-4 rounded">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Contact;



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

const Contact = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

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
        sender: "B",
        text: input,
        timestamp: Timestamp.now(),
      });
      setInput("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-green-600">Contact Chat</h2>
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
          placeholder="Message from Contact"
        />
        <button onClick={handleSend} className="bg-green-600 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Contact;
