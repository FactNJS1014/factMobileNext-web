"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../config";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignin = async () => {
    try {
      const payload = {
        username: username,
        password: password,
      };
      const response = await axios.post(config.apiUrl + "/signin", payload);
      //   console.log(response.data);
      if (response.data.token !== null) {
        localStorage.setItem("token", response.data.token);
        router.push("/backoffice/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: "Invalid username or password!",
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: "Invalid username or password!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: (error as Error).message,
        });
      }
    }
  };

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

        <button className="button" onClick={handleSignin}>
          Sign In
          <i className="fa-solid fa-right-to-bracket ml-2"></i>
        </button>
      </div>
    </div>
  );
}
