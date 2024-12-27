/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SET_CONTACTS,
  SET_SELECTED_CONTACT,
  ADD_MESSAGE,
  SET_MESSAGES,
} from "./actionTypes";

// Define action types
export interface SetContactsAction {
  type: typeof SET_CONTACTS;
  contacts: string[];
}

export interface SetSelectedContactAction {
  type: typeof SET_SELECTED_CONTACT;
  contact: string | null;
}

export interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  contact: string;
  message: string;
}

export interface SetMessagesAction {
  type: typeof SET_MESSAGES;
  contact: string;
  messages: string[];
}

// Action creators
export const setContacts = (contacts: string[]): SetContactsAction => ({
  type: SET_CONTACTS,
  contacts: contacts,
});

export const setSelectedContact = (
  contact: string | null
): SetSelectedContactAction => ({
  type: SET_SELECTED_CONTACT,
  contact,
});

export const addMessage = (
  contact: string,
  message: string
): AddMessageAction => ({
  type: ADD_MESSAGE,
  contact,
  message,
});

export const setMessages = (
  contactId: string,
  messages: any[]
): SetMessagesAction => ({
  type: SET_MESSAGES,
  contact: contactId,
  messages,
});
