import React, { useState } from "react";
import { useInstantDB } from "../hooks/useInstantDB";

interface MessageInputProps {
  contact: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ contact }) => {
  const [message, setMessage] = useState("");
  const { addMessage } = useInstantDB();

  const handleSendMessage = () => {
    if (message.trim()) {
      addMessage(contact, message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border p-2 rounded-md"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 bg-blue-500 text-white p-2 rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
