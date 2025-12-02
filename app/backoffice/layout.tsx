import Sidebar from "./sidebar";

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5 bg-gray-200 h-screen">
        <div className="bg-white p-5 rounded-lg shadow-lg">{children}</div>
      </div>
    </div>
  );
}
