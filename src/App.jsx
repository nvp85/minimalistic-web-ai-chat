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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="" element={<HomePage />} />
          <Route path="chats/:uuid" element={<ChatPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="api-key" element={<APIkeyForm />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="chats" element={<ChatList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App;
