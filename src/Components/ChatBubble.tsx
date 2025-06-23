import React from 'react';

interface Props {
  message: {
    id: number;
    sender: 'A' | 'B';
    text: string;
  };
}

const ChatBubble: React.FC<Props> = ({ message }) => {
  const isA = message.sender === 'A';

  return (
    <div className={`flex ${isA ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[60%] px-4 py-2 rounded-full text-white ${
          isA ? 'bg-blue-500' : 'bg-green-500'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatBubble;
