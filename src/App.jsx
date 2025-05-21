import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";
import Profile from "./components/Profile";
import './App.css';
import APIkeyForm from "./components/APIkeyForm";

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
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App;
