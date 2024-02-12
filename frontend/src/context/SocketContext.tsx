/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

interface SocketIOClient {
  // Add specific methods you'll use from the Socket.IO client
  emit(event: string, ...args: any[]): void;
  on(event: string, callback: (...args: any[]) => void): void;
  close(): void;
  off(event: string, callback?: (...args: any[]) => void): void; // Added off method

}

const SocketContext = createContext<{
  socket: SocketIOClient | null;
  onlineUsers: string[]; // Ensure onlineUsers is part of the context value
}>({
  socket: null,
  onlineUsers: []
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState<SocketIOClient | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (authUser) {
        
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser.id,
        },
      });

      setSocket(newSocket);
    //   listen
      newSocket.on("getOnlineUsers", (users) => {
        console.log("users", users);

        setOnlineUsers(users);
      });

      return () => {
        // Close the socket within the cleanup function
        newSocket.close();
      };
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
