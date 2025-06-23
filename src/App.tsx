
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Navigator from "./Components/Navigator";
import Admin from "./Components/Admin";
import Contact from "./Components/Contact";
import {db } from "./firebase"
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";


export interface Message {
  id?: string;
  sender: "A" | "B";
  text: string;
  timestamp: any;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

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

  const addMessage = async (msg: Omit<Message, "timestamp">) => {
    await addDoc(collection(db, "messages"), {
      ...msg,
      timestamp: Timestamp.now(),
    });
  };

  return (
    <div>
      <Navigator />
      <Routes>
        <Route path="/contact" element={<Contact messages={messages} addMessage={addMessage} />} />
        <Route path="/admin" element={<Admin messages={messages} addMessage={addMessage} />} />
      </Routes>
    </div>
  );
};

export default App;


