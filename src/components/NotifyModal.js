import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmModal = ({ modalDetails, handleInput }) => {
  return (
    <Modal
      size="sm"
      show={modalDetails.showModal}
      backdrop="static"
      keyboard={false}
      onHide={() => handleInput()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {modalDetails.modalHeader}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalDetails.modalText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleInput()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;