// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/global.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  if (!user) return <div className="loading">Loading...</div>;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="container">
      <header className="header">
        <div className="logo">SWIFT</div>
        <div className="avatar-circle">
          <span className="avatar-initials">{initials}</span>
          <span className="user-name">{user.name}</span>
        </div>
      </header>

      <div className="content">
        <h2 className="welcome-title">Welcome, {user.name}</h2>
        <div className="profile-card">
          <div className="avatar-big">
            <div className="avatar-initials">{initials}</div>
            <p className="email-text">{user.email}</p>
          </div>
          <div className="details-grid">
            <div className="detail">
              <label>User ID</label>
              <div>{user.id}</div>
            </div>
            <div className="detail">
              <label>Name</label>
              <div>{user.name}</div>
            </div>
            <div className="detail">
              <label>Email ID</label>
              <div>{user.email}</div>
            </div>
            <div className="detail">
              <label>Address</label>
              <div>{user.address.street}, {user.address.city}</div>
            </div>
            <div className="detail full-width">
              <label>Phone</label>
              <div>{user.phone}</div>
            </div>
          </div>
        </div>

        <Link to="/dashboard" className="back-btn">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Profile;
