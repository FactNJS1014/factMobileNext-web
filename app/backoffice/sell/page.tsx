"use client";
import { useState, useEffect } from "react";
import { config } from "../../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const [serial, setSerial] = useState("");
  const [price, setPrice] = useState(0);
  const [sells, setSells] = useState([]);
  const [id, setId] = useState(0);
  const [total, setTotal] = useState(0);
  const router = useRouter();

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
      fetchData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/sell/list`);
      setSells(response.data);

      let total = 0;
      for (let i = 0; i < response.data.length; i++) {
        total += response.data[i].price;
      }
      setTotal(total);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const button = await Swal.fire({
        icon: "warning",
        title: "Delete",
        text: "Are you sure you want to delete this sell?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (button.isConfirmed) {
        await axios.delete(`${config.apiUrl}/sell/delete/${id}`);
        Swal.fire({
          icon: "success",
          title: "Delete Success",
          text: "Sell deleted successfully!",
          timer: 2000,
        });
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Sell deleted failed!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: (error as Error).message,
      });
    }
  };

  const handleConfirm = async () => {
    try {
      const button = await Swal.fire({
        icon: "warning",
        title: "Confirm",
        text: "Are you sure you want to confirm this sell?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (button.isConfirmed) {
        await axios.post(`${config.apiUrl}/sell/confirm`);
        Swal.fire({
          icon: "success",
          title: "Confirm Success",
          text: "Sell confirmed successfully!",
          timer: 2000,
        });
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Confirm Failed",
          text: "Sell confirmed failed!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Confirm Failed",
        text: (error as Error).message,
      });
    }
  };

  return (
    <div>
      <div className="content-header flex justify-between">
        <div>ขายสินค้า</div>
        <div>
          <button
            className="bg-teal-600 text-white px-8 py-2 rounded-lg text-lg"
            onClick={() => router.push("/backoffice/sell/history")}
          >
            <i className="fa-solid fa-list mr-2"></i>ประวัติการขาย
          </button>
        </div>
      </div>
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
      <table className="table mt-3">
        <thead>
          <tr>
            <th className="text-left">Serial</th>
            <th className="text-left">รายการสินค้า</th>

            <th className="text-right">ราคาขาย</th>
            <th className="w-[110px]"></th>
          </tr>
        </thead>
        <tbody>
          {sells.map((sell) => (
            <tr key={sell.id}>
              <td className="text-left">{sell.product.serial}</td>
              <td className="text-left">{sell.product.name}</td>

              <td className="text-right">{sell.price.toLocaleString()}</td>
              <td className="text-center">
                <button
                  className="flex items-center bg-red-600 text-white px-3 py-2 rounded"
                  onClick={() => handleDelete(sell.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sells.length > 0 && (
        <>
          <div className="mt-5 flex justify-between">
            <div>ยอดรวมทั้งหมด</div>
            <div className="text-right font-bold bg-gray-300 px-4 py-2 rounded-md">
              {total.toLocaleString()}
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              className="flex items-center bg-teal-600 text-white px-8 py-2 rounded-lg"
              onClick={handleConfirm}
            >
              <i className="fa-solid fa-check mr-2"></i>ยืนยันการขาย
            </button>
          </div>
        </>
      )}
    </div>
  );
}
