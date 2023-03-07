import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { clear } from "../AppSlice";

const NotifyModal = ({ modalDetails }) => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(clear());
  };

  return (
    <Modal
      size="sm"
      show={modalDetails.showModal && !modalDetails.isConfirm}
      backdrop="static"
      keyboard={false}
      onHide={() => close()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {modalDetails.modalHeader}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalDetails.modalText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => close()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotifyModal;
