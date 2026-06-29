import { useModal } from "@/store/useModal.store";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div
        className="p-5 md:p-10 rounded-2xl w-fit h-fit relative bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute bg-white border border-gray-200 rounded-full p-1 text-gray-600 top-4 right-3 hover:text-gray-900"
          onClick={closeModal}
          aria-label="Close Modal"
        >
          <IoClose size={24} />
        </button>

        <div className=" max-h-[75vh] overflow-y-scroll scrollbar-hide">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
