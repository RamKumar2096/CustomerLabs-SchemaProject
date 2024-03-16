import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Modal from "./Components/Modal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Navbar onOpenModal={handleOpenModal} />
      {modalOpen && <Modal onCloseModal={handleCloseModal} />}
    </div>
  );
}

export default App;
