/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { init, id } from "@instantdb/react";

const db = init({
  appId: "ce93dbf4-4ca5-43c0-86d7-bf2492cce344",
});

const ChatWindow: React.FC = () => {
  const selectedContact = useSelector((state: any) => state.selectedContact);
  const [message, setMessage] = useState("");

  // Query messages for the selected contact
  const query = {
    messages: {
      $: {
        where: {
          contactId: selectedContact?.id,
        },
      },
    },
  };
  const { isLoading, error, data } = db.useQuery(query);

  const handleSendMessage = async () => {
    if (selectedContact?.id && message.trim()) {
      try {
        // Add the message to the database
        await db.transact(
          db.tx.messages[id()].merge({
            contactId: selectedContact.id,
            text: message.trim(),
            timestamp: new Date().toISOString(),
          })
        );
        setMessage("");
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
  };

  // If no contact is selected, display a message
  if (!selectedContact) {
    return (
      <div className="flex items-center justify-center mx-auto m-3 text-center h-full text-gray-500">
        Select a contact to chat.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 bg-green-300 border-b">
        <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
      </div>

      {/* Display messages */}
      <div className="flex-1">
        {isLoading ? (
          <div className="p-2 text-gray-500">Loading messages...</div>
        ) : error ? (
          <div className="p-2 text-red-500">Error loading messages</div>
        ) : data?.messages?.length > 0 ? (
          data.messages.map((msg: any, index: number) => (
            <div
              key={index}
              className="p-2 flex justify-between items-baseline"
            >
              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  {selectedContact.name.split("")[0]}
                </span>
                <div className="bg-gray-100 p-2 rounded-md">{msg.text}</div>
              </div>
              <span className="text-gray-500 text-xs">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">No messages yet</div>
        )}
      </div>

      {/* Input and send button */}
      <div className="p-2 border-t flex items-center">
        <input
          type="text"
          className="w-full p-2 border"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "../actions/action";
// import { init, id } from "@instantdb/react";

// // Initialize InstantDB
// const db = init({
//   appId: "ce93dbf4-4ca5-43c0-86d7-bf2492cce344",
// });

// const ChatWindow: React.FC = () => {
//   const dispatch = useDispatch();
//   const selectedContact = useSelector((state: any) => state.selectedContact); // { id, name }
//   const messages = useSelector((state: any) => state.messages); // { [contactId]: string[] }
//   const [message, setMessage] = useState("");

//   // Query messages for the selected contact
//   const query = {
//     messages: {
//       $: {
//         where: {
//           contactId: selectedContact?.id,
//         },
//       },
//     },
//   };
//   const { isLoading, error, data } = db.useQuery(query);

//   // Update Redux state when query data changes
//   useEffect(() => {
//     if (data?.messages && selectedContact?.id) {
//       dispatch(setMessages(selectedContact.id, data.messages));
//     }
//   }, [data, selectedContact, dispatch]);

//   const handleSendMessage = async () => {
//     if (selectedContact?.id && message.trim()) {
//       try {
//         // Add the message to the database
//         await db.transact(
//           db.tx.messages[id()].update({
//             contactId: selectedContact.id,
//             text: message.trim(),
//             timestamp: new Date().toISOString(),
//           })
//         );
//         setMessage(""); // Clear the input
//       } catch (err) {
//         console.error("Error sending message:", err);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col flex-1">
//       {/* Display selected contact's name */}
//       {selectedContact && (
//         <div className="p-2 bg-gray-200 border-b">
//           <h2>{selectedContact.name}</h2>
//         </div>
//       )}

//       {/* Display messages */}
//       <div className="flex-1 overflow-y-auto">
//         {isLoading ? (
//           <div className="p-2 text-gray-500">Loading messages...</div>
//         ) : error ? (
//           <div className="p-2 text-red-500">Error loading messages</div>
//         ) : messages[selectedContact?.id]?.length > 0 ? (
//           messages[selectedContact.id].map((msg: any, index: number) => (
//             <div key={index} className="p-2">
//               {msg.text}
//             </div>
//           ))
//         ) : (
//           <div className="p-2 text-gray-500">No messages yet</div>
//         )}
//       </div>

//       {/* Input and send button */}
//       <div className="p-2 border-t flex items-center">
//         <input
//           type="text"
//           className="w-full p-2 border"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSendMessage();
//             }
//           }}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-2 p-2 bg-blue-500 text-white rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
