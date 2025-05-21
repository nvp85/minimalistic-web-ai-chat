import ChatList from "./ChatList";


export default function HomePage() {
    // dispays the side bar with the list of chats on the left side
    // and a chat starter form on the right side
    // when user starts a new chat it navigates the user to an individual chat route
    return (
        <> 
            <p>Home page</p>
            <ChatList />
            <p>Input fields to start a chat</p>
        </>
    )
}