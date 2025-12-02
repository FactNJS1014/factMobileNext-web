import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-teal-600 h-screen w-64 fixed">
      <div className="p-5 bg-teal-800 text-white">
        <h1 className="text-xl">Fact Mobile Version 1.0</h1>
        <div className="flex items-center gap-2 mt-3">
          <i className="fa-solid fa-user"></i>
          <span className="w-full text-sm">Natdanai Jansomboon</span>
          <button className="bg-yellow-500 rounded-full px-2 py-1">
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button className="bg-red-500 rounded-full px-2 py-1">
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
    </div>
  );
}
