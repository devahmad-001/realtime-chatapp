import { ChatContext } from "./ChatContext";

export const ChatProvider = ({ children }: any) => {
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
};
