// messageActions.ts

import { SET_MESSAGES } from "./actionTypes"; // Import action type

export const fetchMessages = (contact: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`/api/messages?contact=${contact}`);
      const data = await response.json();
      if (data?.messages) {
        dispatch({
          type: SET_MESSAGES,
          contact,
          messages: data.messages,
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
};
