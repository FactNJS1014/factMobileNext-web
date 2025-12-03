"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../../config";
import Modal from "../modal";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [serial, setSerial] = useState("");
  const [name, setName] = useState("");
  const [release, setRelease] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [qty, setQty] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(config.apiUrl + "/buy/list");
      setProducts(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Fetch Failed",
        text: (error as Error).message,
      });
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const onCloseModal = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        serial: serial,
        name: name,
        release: release,
        color: color,
        price: price,
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress,
        remark: remark,
        qty: qty,
      };
      if (id === "") {
        await axios.post(`${config.apiUrl}/buy/create`, payload);
        Swal.fire({
          icon: "success",
          title: "Save Success",
          text: "Buy saved successfully!",
          timer: 2000,
        });
        onCloseModal();
        fetchData();
      } else {
        await axios.put(`${config.apiUrl}/buy/update/${id}`, payload);
        setId("");
        Swal.fire({
          icon: "success",
          title: "Update Success",
          text: "Buy updated successfully!",
          timer: 2000,
        });
        onCloseModal();
        fetchData();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: (error as Error).message,
      });
    }
  };

  const handleEdit = (id: string) => {
    const product = products.find((product: any) => product.id === id);
    if (product) {
      setSerial(product.serial);
      setName(product.name);
      setRelease(product.release);
      setColor(product.color);
      setPrice(product.price);
      setCustomerName(product.customerName);
      setCustomerPhone(product.customerPhone);
      setCustomerAddress(product.customerAddress);
      setRemark(product.remark);
      setId(product.id);
      setQty(product.qty);
      setIsOpen(true);
    }
    handleOpenModal();
  };

  const handleDelete = async (id: string) => {
    try {
      const button = Swal.fire({
        icon: "warning",
        title: "Delete",
        text: "Are you sure you want to delete this buy?",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if ((await button).isConfirmed) {
        await axios.delete(`${config.apiUrl}/buy/delete/${id}`);
        Swal.fire({
          icon: "success",
          title: "Delete Success",
          text: "Buy deleted successfully!",
          timer: 2000,
        });
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

  const handleClear = () => {
    setSerial("");
    setName("");
    setRelease("");
    setColor("");
    setPrice(0);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setRemark("");
    setQty(1);
  };

  return (
    <div>
      <h1 className="content-header">รายการซื้อสินค้า</h1>
      <div>
        <button
          className="bg-teal-600 text-white px-8 py-2 rounded-lg"
          onClick={() => {
            handleClear();
            handleOpenModal();
          }}
        >
          <i className="fa-solid fa-plus mr-2"></i>
          เพิ่มรายการ
        </button>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Serial</th>
              <th>ชื่อสินค้า</th>
              <th>รุ่น</th>
              <th>สี</th>
              <th>ราคา</th>
              <th>ชื่อผู้ซื้อ</th>
              <th>เบอร์โทรศัพท์</th>
              <th>หมายเหตุ</th>
              <th className="w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id}>
                <td>{product.serial}</td>
                <td>{product.name}</td>
                <td>{product.release}</td>
                <td>{product.color}</td>
                <td>{product.price}</td>
                <td>{product.customerName}</td>
                <td>{product.customerPhone}</td>
                <td>{product.remark}</td>
                <td className="text-center">
                  <button
                    className="btn-info mr-1"
                    onClick={() => handleEdit(product.id)}
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal title="เพิ่มรายการ" isOpen={isOpen} onClose={onCloseModal}>
        <div>Serial สินค้า</div>
        <input
          type="text"
          onChange={(e) => setSerial(e.target.value)}
          value={serial}
          className="border border-gray-700 p-2 w-full rounded-md"
        />
        <div className="mt-2">ชื่อสินค้า</div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="input"
        />
        <div className="mt-2">รุ่น</div>
        <input
          type="text"
          onChange={(e) => setRelease(e.target.value)}
          value={release}
          className="input"
        />
        <div className="mt-2">สี</div>
        <input
          type="text"
          onChange={(e) => setColor(e.target.value)}
          value={color}
          className="input"
        />
        <div className="mt-2">ราคา</div>
        <input
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
          className="input"
        />
        <div className="mt-2">ชื่อผู้ซื้อ</div>
        <input
          type="text"
          onChange={(e) => setCustomerName(e.target.value)}
          value={customerName}
          className="input"
        />
        <div className="mt-2">เบอร์โทรศัพท์</div>
        <input
          type="text"
          onChange={(e) => setCustomerPhone(e.target.value)}
          value={customerPhone}
          className="input"
        />
        <div className="mt-2">ที่อยู่</div>
        <input
          type="text"
          onChange={(e) => setCustomerAddress(e.target.value)}
          value={customerAddress}
          className="input"
        />
        <div className="mt-2">หมายเหตุ</div>
        <input
          type="text"
          onChange={(e) => setRemark(e.target.value)}
          value={remark}
          className="input"
        />
        <div className="mt-2">จำนวน</div>
        <input
          type="number"
          onChange={(e) => setQty(Number(e.target.value ?? 0))}
          value={qty}
          className="input"
        />
        <div>
          <button
            className="mt-4 bg-teal-700 text-white px-8 py-2 rounded-lg"
            onClick={handleSave}
          >
            <i className="fa-solid fa-save mr-2"></i>
            บันทึก
          </button>
        </div>
      </Modal>
    </div>
  );
}
