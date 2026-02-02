import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function AppLayout() {
  return (
    <div className="ph-app">
      <Navbar />
      <main className="ph-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
