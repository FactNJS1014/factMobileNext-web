"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { config } from "../../../config";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [sell, setSell] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/sell/info/${id}`);
      setSell(response.data);
      printDocument();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };
  const printDocument = () => {
    const style = document.createElement("style");
    style.innerHTML = `
        @media print {
            body *{
               visibility: hidden;
            }
            #print-content, #print-content *{
               visibility: visible;
            }
            #print-content {
               position: absolute;
               left: 0;
               top: 0;
               width: 80mm;
               height: 100%;
            }
               .content-header{
                  display: none;
               }
        }
    `;
    document.head.appendChild(style);
    setTimeout(() => {
      window.print();
    }, 300);
  };
  return (
    <div>
      <div className="content-header flex justify-between">
        <div>พิมพ์บิล</div>
        <div>
          <button
            className="flex items-center bg-teal-600 text-white px-8 py-2 rounded-lg text-lg"
            onClick={printDocument}
          >
            <i className="fa-solid fa-print mr-2"></i>พิมพ์
          </button>
        </div>
      </div>
      <div id="print-content">
        <div className="text-2xl font-bold text-center">ใบเสร็จรับเงิน</div>
        <div className="text-left">
          วันที่ {dayjs(sell?.payDate).format("DD/MM/YYYY")}
        </div>
        <div className="text-left">รายการ: {sell?.product?.name}</div>
        <div className="text-left">ราคา: {sell?.price?.toLocaleString()}</div>
        <div className="text-left">
          วันที่ออกบิล: {dayjs(sell?.payDate).format("DD/MM/YYYY")}
        </div>
      </div>
    </div>
  );
}
