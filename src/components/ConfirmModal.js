import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { clear, confirm } from "../AppSlice";

const ConfirmModal = ({ modalDetails }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      size="sm"
      show={modalDetails.showModal && modalDetails.isConfirm}
      backdrop="static"
      keyboard={false}
      onHide={() => dispatch(clear())}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {modalDetails.modalHeader}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalDetails.modalText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(clear())}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => dispatch(confirm())}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
