// Import necessary types
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedContact, setContacts } from "../actions/action";
import { AppDispatch, AppState } from "../store/store"; // import the typed AppDispatch
import { Contact } from "./types"; // Assuming you have a Contact type defined
import { init, i, id } from "@instantdb/react";

// Initialize database connection
const db = init({
  appId: "ce93dbf4-4ca5-43c0-86d7-bf2492cce344",
  schema: i.schema({
    entities: {
      contacts: i.entity({
        name: i.string(),
        phoneNumber: i.number(),
      }),
    },
  }),
});

const ContactList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch
  const contacts = useSelector((state: AppState) => state.contacts); // Properly typed state
  const selectedContact = useSelector(
    (state: AppState) => state.selectedContact
  );

  const { data, error } = db.useQuery({
    contacts: {},
  });

  React.useEffect(() => {
    if (data?.contacts) {
      console.log("Fetched contacts from the database:", data.contacts);
      dispatch(setContacts(data.contacts)); // dispatch correctly typed action
    }
    if (error) {
      console.error("Error fetching contacts from the database:", error);
    }
  }, [data, error, dispatch]);

  // Handle selecting a contact
  const handleSelectContact = (contact: Contact) => {
    dispatch(setSelectedContact(contact)); // dispatch correctly typed action
  };

  // Handle adding a new contact
  const handleAddContact = async () => {
    const contactName = prompt("Enter the new contact's name:");
    if (!contactName) return; // Exit if no name is provided

    // Persist the contact to the database
    try {
      await db.transact(
        db.tx.contacts[id()].update({
          name: contactName,
        })
      );
      console.log("New contact added to the database.");
    } catch (error) {
      console.error("Error adding contact to database:", error);
    }
  };

  return (
    <div className="w-auto bg-gray-100 p-4 relative">
      <h2 className="text-lg text-green-500 font-bold mb-4">ChattyApp</h2>
      <h2 className="text-xl text-green-500 font-semibold">All Contacts</h2>
      <ul className="mt-4">
        {contacts.length === 0 ? (
          <div>No contacts available</div>
        ) : (
          contacts.map((contact: Contact) => (
            <li
              key={contact.id}
              onClick={() => handleSelectContact(contact)}
              className={`p-2 text-lg font-semibold cursor-pointer rounded ${
                selectedContact?.id === contact.id
                  ? "bg-blue-200"
                  : "hover:bg-gray-200"
              }`}
            >
              {contact.name}
            </li>
          ))
        )}
      </ul>
      <button
        className="absolute bottom-4 left-2 bg-blue-500 text-white px-4 py-2 rounded-md m-1 mr-3"
        onClick={handleAddContact}
      >
        + Add Contact
      </button>
    </div>
  );
};

export default ContactList;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedContact, setContacts } from "../actions/action";
// import { init, i } from "@instantdb/react";

// // Initialize InstantDB
// const db = init({
//   appId: "ce93dbf4-4ca5-43c0-86d7-bf2492cce344",
//   schema: i.schema({
//     entities: {
//       contacts: i.entity({
//         name: i.string(),
//         phoneNumber: i.number(),
//       }),
//     },
//   }),
// });

// const ContactList: React.FC = () => {
//   const dispatch = useDispatch();
//   const contacts = useSelector((state: any) => state.contacts);
//   const selectedContact = useSelector((state: any) => state.selectedContact);

//   // Fetch contacts from the database and dispatch them to the Redux store
//   const fetchContacts = async () => {
//     try {
//       const { data: result } = await db.useQuery({
//         contacts: {},
//       });
//       const contactsFromDb = result?.contacts || [];
//       console.log("Fetched contacts from the database:", contactsFromDb);

//       // Update the Redux store with the fetched contacts
//       dispatch(setContacts(contactsFromDb));
//     } catch (error) {
//       console.error("Error fetching contacts from the database:", error);
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   // Handle selecting a contact
//   const handleSelectContact = (contact: any) => {
//     dispatch(setSelectedContact(contact));
//   };

//   // Handle adding a new contact
//   const handleAddContact = async () => {
//     const contactName = prompt("Enter the new contact's name:");
//     if (!contactName) return; // Exit if no name is provided

//     // Optionally: Persist the contact to the database
//     try {
//       await db.transact(
//         db.tx.contacts.create({
//           name: contactName,
//         })
//       );
//       console.log("New contact added to the database.");

//       // Fetch updated contacts after adding
//       await fetchContacts();
//     } catch (error) {
//       console.error("Error adding contact to database:", error);
//     }
//   };

//   return (
//     <div className="w-64 bg-gray-100 p-4 relative">
//       <h2 className="text-xl font-semibold">Contacts</h2>
//       <ul className="mt-4">
//         {contacts.length === 0 ? (
//           <div>No contacts available</div>
//         ) : (
//           contacts.map((contact: any) => (
//             <li
//               key={contact.id}
//               onClick={() => handleSelectContact(contact)}
//               className={`p-2 cursor-pointer rounded ${
//                 selectedContact?.id === contact.id
//                   ? "bg-blue-200"
//                   : "hover:bg-gray-200"
//               }`}
//             >
//               {contact.name}
//             </li>
//           ))
//         )}
//       </ul>
//       <button
//         className="absolute bottom-4 left-2 bg-blue-500 text-white px-4 py-2 rounded-md"
//         onClick={handleAddContact}
//       >
//         Add Contact
//       </button>
//     </div>
//   );
// };

// export default ContactList;
