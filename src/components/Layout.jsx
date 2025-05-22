import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <div id="main-container">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}