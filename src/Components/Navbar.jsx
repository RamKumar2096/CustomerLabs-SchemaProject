import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveSegment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-teal-600 p-6">
        <div className="text-white">
          <span className="font-semibold text-xl tracking-tight">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> View
            Audience
          </span>
        </div>
      </nav>
      <div className="container mx-auto mt-10 px-4">
        <button
          className="px-4 py-2 bg-transparent text-black-500 border border-black rounded-md hover:bg-teal-600 hover:border-teal-600  hover:text-white flex items-center"
          onClick={handleSaveSegment}
        >
          Save Segment
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
}

export default Navbar;
