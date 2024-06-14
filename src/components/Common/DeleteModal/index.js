import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './CustomStyles.scss';
const DeleteConfirmationModal = ({ isOpen, toggle, onConfirm }) => {
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className="blur-background-modal">
        <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onConfirm}>Delete</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
      {isOpen && <div className="modal-backdrop" />}
    </>
  );
};

export default DeleteConfirmationModal;
