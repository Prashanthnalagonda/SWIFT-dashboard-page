import React from "react";
import CommentTable from "../components/CommentTable";
import "../styles/global.css";

const Dashboard = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">SWIFT</div>
        <div className="avatar-circle">
          <span className="avatar-initials">EH</span>
        </div>
      </header>

      <div className="content">
        <CommentTable />
      </div>
    </div>
  );
};

export default Dashboard;
