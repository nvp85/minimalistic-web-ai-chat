import { useState, createContext, useEffect, useContext } from "react";
import { useUser } from "./UserProvider";


const ChatListContext = createContext();

export default function ChatListProvider({children}) {
    const { manageUser } = useUser();
    const currentUser = manageUser.storedUser;
    const [chats, setChats] = useState([]);
    const [ error, setError ] = useState();

    // simulating a call to a backend API to fetch the user's chats
    function fetchChats() {
        const storedChats = localStorage.getItem("chats");
        if (!storedChats) {
            throw new Error("Fail to retrieve the data.");
        }
        setChats(JSON.parse(storedChats));
    }

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        try {
            fetchChats();
        } catch {
            setError("Fail to retrieve the chat list data.");
        }

    }, []);

    // simulating a call to a backend API to save/update the user's chats
    useEffect(() => {
        try {
            localStorage.setItem(JSON.stringify(chats));
        } catch {
            setError("Fail to save the chat list data.");
        }
    }, [chats]);

    return (
        <ChatListContext value={{chats, setChats, error}}>
            {children}
        </ChatListContext>
    )
}

export function useChatList() {
    return useContext(ChatListContext);
}