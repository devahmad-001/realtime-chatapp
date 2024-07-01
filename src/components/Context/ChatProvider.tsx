"use client"

import { useContext, useReducer } from "react";
import { ChatContext } from "./ChatContext";
import { AuthContext } from "./AuthContext";

export const ChatContextProvider = ({ children }: any) => {
  const { currentUser }: any = useContext(AuthContext);

  const INITIAL_STATE = {
    chatID: "null",
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          chatID:
            currentUser.uid > action.payload.id
              ? currentUser.uid + action.payload.id
              : action.payload.id + currentUser.uid,
          user: action.payload,
        };
      default:
        return {};
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{data:state,dispatch}}>{children}</ChatContext.Provider>;
};
