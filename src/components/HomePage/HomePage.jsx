import ChatList from "../ChatList/ChatList";
import ChatTextarea from "../ChatTextarea/ChatTextarea";
import './HomePage.css';


export default function HomePage() {
    // dispays the side bar with the list of chats on the left side
    // and a chat starter form on the right side
    // when user starts a new chat it navigates the user to an individual chat route


    return (
        <div className="two-column-container"> 
            <div>
                <ChatList />            
            </div>
            <div id="right-column">

                <ChatTextarea />
            </div>
        </div>
    )
}