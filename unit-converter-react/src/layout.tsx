import React from "react";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Right side content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {children}
      </div>
    </div>
  );
}
