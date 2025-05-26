import { createContext, useContext, useState, useEffect, useSyncExternalStore } from "react";
import useSyncLocalstorage from "./useSyncLocalstorage";
import chatsData from '../assets/chats.json';

// this context provider is in sync with localStorage and provides the user object to all the children
const UserContext = createContext();

// returns the current user from the local storage
let lastSnapshot; // must be hashed to avoid infinite loop of re-rendering
function getSnapshot() {
    const currentUser = localStorage.getItem("user");
    if (currentUser !== JSON.stringify(lastSnapshot)) {
        lastSnapshot = JSON.parse(currentUser);
    }
    return lastSnapshot;
}
// subscribes to the local storage changes and returns a cleanup function
function subscribe(callback) {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
}

export default function UserProvider({children}) {
    const storedUser = useSyncExternalStore(subscribe, getSnapshot);

    // save changes in the user to local storage
    // TODO: save user and login use should be separated: 
    // as we dont want to reset the chats any time the user edit their profile
    const saveUser = (user) => {
        let chats = JSON.stringify(chatsData.filter(chat => user.id == chat.userId))
        user = JSON.stringify(user);
        localStorage.setItem("user", user);
        localStorage.setItem("chats", chats);
        window.dispatchEvent(new StorageEvent('storage', {key: "user", newValue: user}));
    }
    // remove the user from the storage
    const removeUser = () => {
        localStorage.removeItem("user");
        const chats = JSON.parse(localStorage.getItem("chats"));
        chats.forEach(chat => localStorage.removeItem(chat.id));
        localStorage.removeItem("chats");
        window.dispatchEvent(new StorageEvent('storage', {key: "user", newValue: null}));
    }


    return (
        <UserContext.Provider value={{storedUser, saveUser, removeUser}}>
            {children}
        </UserContext.Provider>
    )
}

// a hook for using the auth context
export function useUser() {
    return useContext(UserContext);
}