import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
    return (
        <div className="min-h-screen pb-16 bg-[#fafafa] transition-all duration-400 dark:bg-[#202c37] ">
            <Navbar />
            <Outlet />
        </div>
    )
}