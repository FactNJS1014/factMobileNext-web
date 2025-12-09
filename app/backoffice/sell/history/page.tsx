"use client";

import { useState, useEffect } from "react";
import { config } from "../../../config";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const [sellsList, setSellsList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/sell/history`);
      setSellsList(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  return (
    <div>
      <div className="content-header">
        <div>ประวัติการขาย</div>
      </div>
      <table className="table mt-3">
        <thead>
          <tr>
            <th className="text-left w-[150px]">วันที่ขาย</th>
            <th className="text-left">รายการสินค้า</th>
            <th className="text-right w-[150px]">ราคา</th>
            <th className="text-center w-[110px]">พิมพ์บิล</th>
          </tr>
        </thead>
        <tbody>
          {sellsList.map((sell: any, index: number) => (
            <tr key={index}>
              <td className="text-left">
                {dayjs(sell.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-left">{sell.product.name}</td>

              <td className="text-right">{sell.price.toLocaleString()}</td>
              <td className="text-center">
                <button
                  className="flex items-center bg-teal-600 text-white px-3 py-2 rounded"
                  onClick={() =>
                    router.push(`/backoffice/sell/print?id=${sell.id}`)
                  }
                >
                  <i className="fa-solid fa-print mr-2"></i> พิมพ์
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
