"use client";

import { useEffect, useState } from "react";
import { config } from "../../config";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "../modal";
import dayjs from "dayjs";

interface Service {
  id: number;
  name: string;
  price: number;
  remark: string;
}

export default function ServiceRepair() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [remark, setRemark] = useState("");
  const [id, setId] = useState(0);
  const [services, setServices] = useState<Service[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/service/list`);
      setServices(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: name,
        price: price,
        remark: remark,
      };
      if (id != 0) {
        await axios.put(config.apiUrl + "/service/update/" + id, payload);
      } else {
        await axios.post(config.apiUrl + "/service/create", payload);
      }

      handleCloseModal();
      fetchData();
      clearForm();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  const clearForm = () => {
    setName("");
    setPrice(0);
    setRemark("");
    setId(0);
  };

  const handleEdit = (id: string) => {
    const repair = services.find((service: Service) => service.id === id);
    if (repair) {
      setName(repair.name);
      setPrice(repair.price);
      setRemark(repair.remark);
      setId(repair.id);
      handleOpenModal();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const button = await Swal.fire({
        icon: "warning",
        title: "Delete",
        text: "Are you sure you want to delete this service?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (button.isConfirmed) {
        await axios.delete(`${config.apiUrl}/service/remove/${id}`);
        Swal.fire({
          icon: "success",
          title: "Delete Success",
          text: "Service deleted successfully!",
          timer: 2000,
        });
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Service deleted failed!",
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

  return (
    <div>
      <div>
        <h1 className="content-header">งานบริการ</h1>
        <div>
          <button
            className=" bg-teal-600 text-white px-8 py-2 rounded-lg"
            onClick={handleOpenModal}
          >
            <i className="fa-solid fa-plus mr-2"></i>บันทึกงานบริการ
          </button>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th className="text-left">ชื่องานบริการ</th>
              <th className="text-right">ราคา</th>
              <th className="text-left">หมายเหตุ</th>
              <th className="text-left">วันที่บันทึก</th>
              <th className="w-[110px]"></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="text-left">{service.name}</td>
                <td className="text-right">{service.price.toLocaleString()}</td>
                <td className="text-left">{service.remark}</td>
                <td className="text-left">
                  {dayjs(service.payDate).format("DD/MM/YYYY")}
                </td>
                <td className="text-center">
                  <div className="flex gap-2">
                    <button
                      className="flex items-center bg-yellow-500 text-white px-3 py-2 rounded"
                      onClick={() => handleEdit(service.id)}
                    >
                      <i className="fa-solid fa-edit"></i>
                    </button>
                    <button
                      className="flex items-center bg-red-600 text-white px-3 py-2 rounded"
                      onClick={() => handleDelete(service.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="บันทึกการบริการรับ-ซ่อม"
      >
        <div>
          <label htmlFor="name">ชื่องานบริการ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="price">ราคา</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="remark">หมายเหตุ</label>
          <input
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <button
            className=" bg-teal-600 text-white px-8 py-2 rounded-lg"
            onClick={handleSave}
          >
            <i className="fa-solid fa-save mr-2"></i>บันทึก
          </button>
        </div>
      </Modal>
    </div>
  );
}
