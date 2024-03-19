import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbars/AuthNavbar.jsx";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main className=" z-10 mt-10">
                <Outlet />
            </main>
        </>
    );
}