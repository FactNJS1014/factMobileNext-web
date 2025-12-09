"use client";

import { useEffect, useState } from "react";
import { config } from "../../config";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../modal";

interface User {
  id: string;
  name: string;
  level: string;
  username: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [level, setLevel] = useState("user");
  const [levelList, setLevelList] = useState(["admin", "user"]);
  const [id, setId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/user/list`);
      setUsers(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

    if (id !== "") {
      await axios.put(`${config.apiUrl}/user/update/${id}`, payload);
    } else {
      await axios.post(`${config.apiUrl}/user/create`, payload);
    }

    fetchData();
    handleCloseModal();
    clearForm();
  };

  const handleEdit = async (id: string) => {
    const user = users.find((u: User) => u.id === id);

    if (user) {
      setId(user.id ?? "");
      setName(user.name ?? "");
      setUsername(user.username ?? "");
      setLevel(user.level ?? "user");
      setPassword("");
      setConfirmPassword("");
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const button = Swal.fire({
        icon: "warning",
        title: "Delete",
        text: "Are you sure you want to delete this user?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if ((await button).isConfirmed) {
        await axios.delete(`${config.apiUrl}/user/delete/${id}`);
        fetchData();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: (error as Error).message,
      });
    }
  };

  const clearForm = () => {
    setId("");
    setName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setLevel("user");
  };

  return (
    <div>
      <div>
        <h1 className="content-header">ผู้ใช้งาน</h1>
        <div>
          <button
            className=" bg-teal-600 text-white px-8 py-2 rounded-lg"
            onClick={handleOpenModal}
          >
            <i className="fa-solid fa-plus mr-2"></i>เพิ่มผู้ใช้งาน
          </button>
        </div>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th className="text-left">ชื่อผู้ใช้งาน</th>
            <th className="text-left">ชื่อ</th>
            <th className="text-left">สิทธิ์</th>
            <th className="w-[110px]"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="text-left">{user.username}</td>
              <td className="text-left">{user.name}</td>
              <td className="text-left">{user.level}</td>
              <td className="text-center">
                <div className="flex gap-2">
                  <button
                    className="flex items-center bg-yellow-500 text-white px-3 py-2 rounded"
                    onClick={() => handleEdit(user.id)}
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  <button
                    className="flex items-center bg-red-600 text-white px-3 py-2 rounded"
                    onClick={() => handleDelete(user.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title="เพิ่มผู้ใช้งาน"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <div className="flex flex-col gap-2">
          <div>
            <div>Name</div>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div>Username</div>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div>รหัสผ่าน</div>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div>ยืนยันรหัสผ่าน</div>
            <input
              type="password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <div>ระดับสิทธิ์ผู้ใช้งาน</div>
            <select
              className="w-full p-2 rounded-md border border-gray-600"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              {levelList.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-3">
            <button
              className="bg-teal-500 px-3 py-2 rounded text-white"
              onClick={handleSave}
            >
              <i className="fa-solid fa-save mr-2"></i>เพิ่มผู้ใช้งาน
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
