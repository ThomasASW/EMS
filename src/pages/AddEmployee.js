import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AddForm from "../components/AddForm";

const AddEmployee = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalText, setModalText] = useState("");

  const handleSuccess = () => {
    setModalHeader("Success");
    setModalText("Employee added successfully...");
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 2500);
  };

  const handleSubmit = async (event, name, email, password, role) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3000/users", {
        name: name,
        email: email,
        password: password,
        role: Number(role),
      })
      .then(handleSuccess)
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal size="sm" show={showModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">
            {modalHeader}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
      </Modal>
      <div className="restGrid">
        <h2>Add employee</h2>
        <AddForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default AddEmployee;
