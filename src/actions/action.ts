import {
  SET_CONTACTS,
  SET_SELECTED_CONTACT,
  ADD_MESSAGE,
  SET_MESSAGES,
} from "./actionTypes";

// Define contact type
export interface Contact {
  id: string;
  name: string;
  phoneNumber: number;
}

// Define action types
export interface SetContactsAction {
  type: typeof SET_CONTACTS;
  contacts: Contact[];
}

export interface SetSelectedContactAction {
  type: typeof SET_SELECTED_CONTACT;
  contact: Contact | null;
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

// Union type for all actions
export type Actions =
  | SetContactsAction
  | SetSelectedContactAction
  | AddMessageAction
  | SetMessagesAction;

// Action creators
export const setContacts = (contacts: Contact[]): SetContactsAction => ({
  type: SET_CONTACTS,
  contacts,
});

export const setSelectedContact = (
  contact: Contact | null
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
  messages: string[]
): SetMessagesAction => ({
  type: SET_MESSAGES,
  contact: contactId,
  messages,
});

// Reducer example
interface State {
  contacts: Contact[];
  selectedContact: Contact | null;
  messages: { [contactId: string]: string[] };
}

const initialState: State = {
  contacts: [],
  selectedContact: null,
  messages: {},
};

export const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
      };
    case SET_SELECTED_CONTACT:
      return {
        ...state,
        selectedContact: action.contact,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.contact]: [
            ...(state.messages[action.contact] || []),
            action.message,
          ],
        },
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.contact]: action.messages,
        },
      };
    default:
      return state;
  }
};
