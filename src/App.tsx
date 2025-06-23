import { Route, Routes } from "react-router";
import { useState } from "react";
import Admin from "./Components/Admin";
import Contact from "./Components/Contact";
import Navigator from "./Components/Navigator";

interface Message {
  id: number;
  sender: "A" | "B";
  text: string;
}

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div>
      <Navigator/>
      <Routes>
        <Route
          path="/Contact"
          element={
            <Contact messages={messages} addMessage={addMessage} />
          }
        />
        <Route
          path="/Admin"
          element={
            <Admin messages={messages} addMessage={addMessage} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

