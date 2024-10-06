import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteConfirmation({ showModal, hideModal, confirmModal, id, type, message }) {
  return (
    <Modal
      show={showModal}
      onHide={hideModal}
      centered 
      backdrop="static" 
      keyboard={false} 
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirmModal(type, id)}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
