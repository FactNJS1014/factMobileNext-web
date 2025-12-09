"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { config } from "../../config";
import Swal from "sweetalert2";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalRepair, setTotalRepair] = useState(0);
  const [totalSell, setTotalSell] = useState(0);
  const [listYear, setListYear] = useState<any[]>([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const prevYear = new Date().getFullYear() - 5;
    const year = Array.from({ length: 6 }, (_, index) => prevYear + index);
    setListYear(year);

    fetchData();
    renderChart();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/sell/dashboard/${currentYear}`
      );
      console.log(response.data);
      setTotalIncome(response.data.totalIncome);
      setTotalRepair(response.data.totalRepair);
      setTotalSell(response.data.totalSell);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  const renderChart = () => {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    const data = months.map((month, index) => ({
      name: month,
      income: Math.floor(Math.random() * 1000),
    }));

    setData(data);
  };

  const box = (color: string, title: string, value: string) => {
    return (
      <div
        className={`flex flex-col gap-4 items-end w-full ${color} p-4 rounded-lg text-white`}
      >
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-4xl font-bold">{value}</div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="content-header">Dashboard</h1>
      <div className="flex gap-4 mb-3 items-center">
        <div className="w-[100px] text-right">เลือกปี</div>
        <select
          value={currentYear}
          onChange={(e) => setCurrentYear(Number(e.target.value))}
          className="w-[200px] p-2 border border-gray-300 rounded"
        >
          {listYear.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          className="flex items-center bg-teal-600 text-white px-3 py-2 rounded"
          onClick={() => {
            fetchData();
            renderChart();
          }}
        >
          <i className="fa-solid fa-magnifying-glass mr-2"></i> ค้นหา
        </button>
      </div>
      <div className="flex gap-4">
        {box(
          "bg-purple-600",
          "ยอดขายทั้งหมด",
          totalIncome.toLocaleString() + " บาท"
        )}
        {box(
          "bg-orange-500",
          "งานรับซ่อม",
          totalRepair.toLocaleString() + " งาน"
        )}
        {box(
          "bg-blue-500",
          "รายการขาย",
          totalSell.toLocaleString() + " รายการ"
        )}
      </div>
      <div className="text-center mb-4 mt-5 text-xl font-bold">
        ยอดขายรายเดือน
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) =>
                `รายได้ ${value.toLocaleString()} บาท`
              }
            />
            <Legend />
            <Bar dataKey="income" fill="teal" opacity={0.5} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
