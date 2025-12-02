"use client";

import { useState, useEffect } from "react";

import axios from "axios";
import { config } from "../../config";
import Swal from "sweetalert2";

export default function Page() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [taxcode, setTaxcode] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(config.apiUrl + "/company/list");
      setName(response.data.name);
      setAddress(response.data.address);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setTaxcode(response.data.taxcode);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: name,
        address: address,
        phone: phone,
        email: email,
        taxcode: taxcode,
      };
      await axios.post(config.apiUrl + "/company/create", payload);

      Swal.fire({
        icon: "success",
        title: "Save Success",
        text: "Company saved successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: (error as Error).message,
      });
    }
  };

  return (
    <div>
      <h1 className="content-header">ข้อมูลร้าน</h1>
      <div className="">
        <div className="text-lg ">ชื่อร้าน</div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="input"
        />
        <div className="mt-4 text-lg ">ที่อยู่</div>
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className="input"
        />
        <div className="mt-4 text-lg ">เบอร์โทรศัพท์</div>
        <input
          type="text"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          className="input"
        />
        <div className="mt-4 text-lg ">อีเมล</div>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="input"
        />
        <div className="mt-4 text-lg ">เลขประจำตัวผู้เสียภาษี</div>
        <input
          type="text"
          onChange={(e) => setTaxcode(e.target.value)}
          value={taxcode}
          className="input"
        />
        <div className="flex justify-start">
          <button
            className="mt-4 bg-teal-700 text-white px-8 py-2 rounded-lg"
            onClick={handleSave}
          >
            <i className="fa-solid fa-save mr-2"></i>
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
