import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function DeleteConfirmation({ showModal, hideModal, confirmModal, id, type, message, isDeleteAll }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

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
        {isDeleteAll && (
          <Form.Check
            type="checkbox"
            label="I understand this action cannot be undone"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => confirmModal(type, id)}
          disabled={isDeleteAll && !isChecked} 
        >
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
