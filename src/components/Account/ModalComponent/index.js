import React, { useMemo } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Button } from "reactstrap";
import DataTable from "react-data-table-component";
import "./modal.scss"; // Import your SCSS file
import { useNavigate } from "react-router-dom";

const ModalComponent = ({ isOpen, toggleModal }) => {

  const navigate = useNavigate()

  const years = Array.from({ length: 30 }, (_, index) => ({
    value: 2000 + index,
    label: 2000 + index,
  }));

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ].map((month, index) => ({ value: month, label: month.substring(0, 3) }));
  

  const data = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    type: `Account transcript ${index + 1}`,
    from: years[index % years.length].value,
    to: years[(index + 1) % years.length].value,
    fiscalEnd: months[index % months.length].value,
  }));

  const columns = useMemo(() => [
    {
      name: "Form",
      selector: "type",
      sortable: true,
      center: true,
      cell: (row) => (
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <Input type="checkbox" style={{ marginRight: "8px" }} /> {row.type}
        </div>
      ),
    },
    {
      name: "From",
      selector: "from",
      center: true,
      sortable: true,
      cell: (row) => (
        <Input
          type="select"
          value={row.from}
          className="custom-dropdown-width"
          onChange={() => {}}
        >
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </Input>
      ),
    },
    {
      name: "To",
      selector: "to",
      center: true,
      sortable: true,
      cell: (row) => (
        <Input
          type="select"
          value={row.to}
          className="custom-dropdown-width"
          onChange={() => {}}
        >
          {years.map((year) => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </Input>
      ),
    },
    {
      name: "Fiscal End",
      selector: "fiscalEnd",
      center: true,
      sortable: true,
      cell: (row) => (
        <Input
          type="select"
          value={row.fiscalEnd}
          className="custom-dropdown-width"
          onChange={() => {}}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </Input>
      ),
    },
  ], [])

  const handleSubmit = () => {
    // Handle API calls
    navigate("transcripts")
    toggleModal()
  }

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
        <Button color="primary" onClick={handleSubmit}>
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
