import { useState } from "react";
import { init, i, id } from "@instantdb/react";

// Initialize InstantDB with your public app ID
const db = init({
  appId: "ce93dbf4-4ca5-43c0-86d7-bf2492cce344", // Public app ID
  schema: i.schema({
    entities: {
      contacts: i.entity({
        name: i.string(),
      }),
      messages: i.entity({
        contact: i.string(),
        message: i.string(),
        timestamp: i.number(),
      }),
    },
  }),
});

// Fetch contacts from the database
export const fetchContacts = async () => {
  try {
    const { data } = db.useQuery({ contacts: {} });
    return data.contacts || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

// Fetch messages from the database
export const fetchMessages = async () => {
  try {
    const { data } = db.useQuery({ messages: {} });
    return data.messages || {};
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {};
  }
};

export const useInstantDB = () => {
  const [contacts, setContacts] = useState<string[]>([]);
  const [messages, setMessages] = useState<Record<string, string[]>>({});

  // Add a new contact
  const addContact = async (contact: string) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    await db.transact(db.tx.contacts[id()].update({ name: contact }));
  };

  // Add a new message
  const addMessage = async (contact: string, message: string) => {
    const updatedMessages = { ...messages };
    if (!updatedMessages[contact]) updatedMessages[contact] = [];
    updatedMessages[contact].push(message);
    setMessages(updatedMessages);
    await db.transact(
      db.tx.messages[id()].update({
        contact,
        message,
        timestamp: Date.now(),
      })
    );
  };

  return {
    contacts,
    setContacts,
    messages,
    setMessages,
    addContact,
    addMessage,
    fetchContacts,
    fetchMessages,
  };
};
