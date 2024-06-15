import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import "./modal.scss"; // Import your SCSS file

const ModalComponent = ({ isOpen, toggleModal, years, months, data, columns }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size="lg">
      <ModalHeader toggle={toggleModal} className="bg-primary text-center text-white">
        Add Transcript
      </ModalHeader>
      <ModalBody style={{ maxHeight: "60vh", overflowY: "auto" }}>
        <Row>
          <Col md="12" className="text-center">
            {/* Optional: Add heading if needed */}
            {/* <h4 className="text-primary">Add Transcript</h4> */}
          </Col>
        </Row>
        <Row>
          <Col md="3" className="text-primary">
            Primary Text Heading
          </Col>
        </Row>
        <DataTable
          columns={columns}
          data={data}
          pagination={false} // Hide pagination
          highlightOnHover
          striped
          dense
          noHeader // Hide DataTable header to use custom headers
          customStyles={{
            rows: {
              style: {
                minHeight: "60px", // Increased row height
                padding: "8px", // Increased padding for rows
              },
            },
            headRow: {
              style: {
                minHeight: "40px", // Override the header row height
              },
            },
            headCells: {
              style: {
                paddingLeft: "8px",
                paddingRight: "8px",
              },
            },
          }}
        />
      </ModalBody>
      <ModalFooter className="d-flex justify-content-start">
        <Button color="primary" onClick={toggleModal}>
          Save
        </Button>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
