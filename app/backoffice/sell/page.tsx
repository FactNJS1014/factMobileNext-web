"use client";
import { useState, useEffect } from "react";
import { config } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";

export default function SellPage() {
  const [serial, setSerial] = useState("");
  const [price, setPrice] = useState(0);

  const handleSave = async () => {
    try {
      const payload = {
        serial: serial,
        price: price,
      };
      await axios.post(config.apiUrl + "/sell/add", payload);
      Swal.fire({
        icon: "success",
        title: "Save Success",
        text: "Sell saved successfully!",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="content-header">ขายสินค้า</h1>
      <div className="flex gap-2 items-end">
        <div className="w-full">
          <label htmlFor="serial">รหัสสินค้า</label>
          <input
            type="text"
            placeholder="กรอกรหัสสินค้า"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />
        </div>
        <div className="text-right">
          <label htmlFor="price">ราคาขาย</label>
          <input
            type="number"
            placeholder="กรอกราคาขาย"
            className="text-right"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <button
            className="flex items-center bg-teal-600 text-white px-8 py-2 rounded-lg"
            onClick={handleSave}
          >
            <i className="fa-solid fa-save mr-2"></i>บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
