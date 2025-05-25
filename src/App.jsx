import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import HomePage from "./components/HomePage/HomePage";
import ChatPage from "./components/ChatPage/ChatPage";
import Profile from "./components/Profile/Profile";
import './App.css';
import APIkeyForm from "./components/APIkeyForm/APIkeyForm";
import AboutPage from "./components/AboutPage/AboutPage";
import ChatList from "./components/ChatList/ChatList";
import UserProvider from "./hooks/UserProvider";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

// TODO: protected routes
function App() {
  return (
    <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="login" element={<SignIn />} />
                    <Route path="register" element={<SignUp />} />
                    <Route path="about" element={<AboutPage />} />

                    <Route element=<ProtectedRoutes /> >
                        <Route path="" element={<HomePage />} />
                        <Route path="chats/:id" element={<ChatPage />} />
                        <Route path="chats" element={<ChatList />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="api-key" element={<APIkeyForm />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </UserProvider>
  )

}

export default App;
