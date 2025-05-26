import Footer from "../Footer/Footer";
import { Outlet } from "react-router";
import chatsData from '../../assets/chats.json';
import { useUser } from "../../hooks/UserProvider";

export default function ChatListProvider() {
    const { storedUser } = useUser();
    const [chats, setChats, removeChats] = useSyncLocalstorage("chats", chatsData.filter(chat => chat.userId == storedUser.id));
    return (
        <>
            <Outlet context={{chats, setChats, removeChats}}/>
        </>
    )
}