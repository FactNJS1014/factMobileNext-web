import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-teal-600 h-screen w-64">
      <div className="p-5 bg-teal-800 text-white text-xl">
        <h1>Fact Mobile Version 1.0</h1>
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
