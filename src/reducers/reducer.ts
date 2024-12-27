import {
  SET_CONTACTS,
  SET_SELECTED_CONTACT,
  ADD_MESSAGE,
  SET_MESSAGES,
} from "../actions/actionTypes";
import {
  SetContactsAction,
  SetSelectedContactAction,
  AddMessageAction,
  SetMessagesAction,
} from "../actions/action";

interface AppState {
  contacts: string[];
  selectedContact: string | null;
  messages: Record<string, string[]>;
}

type Action =
  | SetContactsAction
  | SetSelectedContactAction
  | AddMessageAction
  | SetMessagesAction;

const initialState: AppState = {
  contacts: [],
  selectedContact: null,
  messages: {},
};

const reducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.contacts };

    case SET_SELECTED_CONTACT:
      return { ...state, selectedContact: action.contact };

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

export default reducer;
