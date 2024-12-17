import { createContext, useContext, useState } from "react";

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [roomId, setRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [connect, setConnect] = useState(false);
  return (
    <chatContext.Provider
      value={{
        roomId,
        currentUser,
        connect,
        setRoomId,
        setCurrentUser,
        setConnect,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

const useChatContext = () => useContext(chatContext);
export default useChatContext;
