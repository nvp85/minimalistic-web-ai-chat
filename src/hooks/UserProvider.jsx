import { createContext, useContext, useState, useEffect, useSyncExternalStore } from "react";

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
    console.log(children);
    // save changes in the user to local storage
    const saveUser = (user) => {
        localStorage.setItem("user", user);
        window.dispatchEvent(new StorageEvent('storage', {key: "user", newValue: user}));
    }
    // remove the user from the storage
    const removeUser = () => {
        localStorage.removeItem("user");
        storedUser.chats.forEach(chat => localStorage.removeItem(chat.uuid));
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