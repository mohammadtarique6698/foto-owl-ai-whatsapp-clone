// src/components/Message.tsx
import React from "react";

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="mb-2">
      <div className="bg-gray-100 p-2 rounded-md">{message}</div>
    </div>
  );
};

export default Message;
