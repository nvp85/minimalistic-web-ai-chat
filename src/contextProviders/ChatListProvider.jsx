import { useState, createContext, useEffect, useContext } from "react";
import { useUser } from "./UserProvider";


export const ChatListContext = createContext();

export default function ChatListProvider({ children }) {
    const { currentUser } = useUser();
    const [chats, setChats] = useState([]);
    const [error, setError] = useState();

    // simulating a call to a backend API to fetch the user's chats
    function fetchChats() {
        const storedChats = localStorage.getItem("chats");
        // if we have a user but no chats in the storage then it's a new user with an empty chats
        if (!storedChats) {
            localStorage.setItem("chats", JSON.stringify([]));
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
            setError("Failed to retrieve the chat list data.");
        }

    }, []);

    // simulating a call to a backend API to save/update the user's chats
    useEffect(() => {
        try {
            localStorage.setItem(JSON.stringify(chats));
        } catch {
            setError("Failed to save the chat list data.");
        }
    }, [chats]);

    function deleteChat(id) {
        setChats(prev => prev.filter(chat => chat.id != id));
        localStorage.removeItem(id);
    }

    return (
        <ChatListContext value={{ chats, setChats, deleteChat }}>
            {children}
        </ChatListContext>
    )
}
