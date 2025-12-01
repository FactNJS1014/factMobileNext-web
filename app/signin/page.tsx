"use client";

import { useState } from "react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signin-container">
      <div className="signin-content">
        <h1 className="text-2xl font-bold">Sign In</h1>

        <div className="text">Username</div>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="input"
        />
        <div className="text">Password</div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input"
        />

        <button className="button">Sign In</button>
      </div>
    </div>
  );
}
