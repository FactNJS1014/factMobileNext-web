"use client";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-white  rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <h2 className="text-xl mb-4 bg-teal-600 text-white p-4">
          {title}
          <button
            className="absolute top-3 right-3 text-gray-300 hover:text-black"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </h2>

        <div className="mt-4 p-5">{children}</div>
      </div>
    </div>
  );
}
