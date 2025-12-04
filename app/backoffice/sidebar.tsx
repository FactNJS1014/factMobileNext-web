"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { config } from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import Modal from "./modal";

export default function Sidebar() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(config.apiUrl + "/user/info", {
        headers: headers,
      });
      console.log(token);
      setName(response.data.name);
      setLevel(response.data.level);
      setUsername(response.data.username);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleSave = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Not Match",
        text: "Password not match!",
      });
      return;
    }

    const payload = {
      name: name,
      level: level,
      username: username,
      password: password,
    };
    const token = localStorage.getItem("token");
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(headers);
    await axios.put(`${config.apiUrl}/user/update`, payload, {
      headers: headers,
    });
    Swal.fire({
      icon: "success",
      title: "Update Success",
      text: "User updated successfully!",
      timer: 2000,
    });
    fetchData();
    handleCloseModal();
  };

  return (
    <div className="bg-teal-600 h-screen w-64 fixed">
      <div className="p-5 bg-teal-800 text-white">
        <h1 className="text-xl">Fact Mobile Version 1.0</h1>
        <div className="flex items-center gap-2 mt-3">
          <i className="fa-solid fa-user"></i>
          <span className="w-full text-sm">
            {name}: {level}
          </span>
          <button
            className="bg-yellow-500 rounded-full px-2 py-1"
            onClick={handleOpenModal}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button
            className="bg-red-500 rounded-full px-2 py-1"
            onClick={handleLogout}
          >
            <i className="fa-solid fa-sign-out"></i>
          </button>
        </div>
      </div>
      <div className="p-5 text-white text-xl flex flex-col gap-2">
        <div>
          <Link href="/backoffice/dashboard">
            <i className="fa-solid fa-house mr-2 w-[25px]"></i>Dashboard
          </Link>
        </div>
        <div>
          <Link href="/backoffice/buy">
            <i className="fa-solid fa-cart-plus mr-2 w-[25px]"></i>ซื้อสินค้า
          </Link>
        </div>
        <div>
          <Link href="/backoffice/sell">
            <i className="fa-solid fa-dollar-sign mr-2 w-[25px]"></i>ขายสินค้า
          </Link>
        </div>
        <div>
          <Link href="/backoffice/repair">
            <i className="fa-solid fa-wrench mr-2 w-[25px]"></i>
            รับ-ซ่อม
          </Link>
        </div>
        <div>
          <Link href="/backoffice/company">
            <i className="fa-solid fa-building mr-2 w-[25px]"></i>ข้อมูลร้าน
          </Link>
        </div>

        <div>
          <Link href="/backoffice/user">
            <i className="fa-solid fa-user mr-2 w-[25px]"></i>ข้อมูลผู้ใช้
          </Link>
        </div>
      </div>
      <Modal title="ข้อมูลผู้ใช้" isOpen={isOpen} onClose={handleCloseModal}>
        <div className="flex flex-col gap-2">
          <div>ชื่อผู้ใช้</div>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mt-3">Username</div>
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="mt-3">Password</div>
          <input
            type="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-3">Confirm Password</div>
          <input
            type="password"
            className="input"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="mt-3">
            <button
              className="bg-orange-500 px-2 py-1 rounded text-white"
              onClick={handleSave}
            >
              <i className="fa-solid fa-save mr-2"></i>Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
