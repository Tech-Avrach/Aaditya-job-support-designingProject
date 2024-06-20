import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import DataTable from "react-data-table-component";
import "./modal.scss"; // Import your SCSS file
import { useNavigate } from "react-router-dom";
import YearPicker from "../YearPicker";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuarterPicker from "../QuarterPicker";
import { addTranscripttolocal } from "../../../redux/actions/tranScript";
import { useDispatch } from "react-redux";

//Configure toastify
toast.configure();

const ModalComponent = ({ isOpen, toggleModal, userDetail }) => {
  const dispatch =useDispatch()
const navigate = useNavigate()
  const years = Array.from({ length: 30 }, (_, index) => ({
    value: 2000 + index,
    label: 2000 + index,
  }));

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, index) => ({ value: month, label: month.substring(0, 3) }));

  const initialState = [
    // Request Transcripts Business
    {
      isChecked: false,
      formNumber: "990",
      fromTaxYear: "2000",
      toTaxYear: "2023",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 1,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1041",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 1,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1065",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 1,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1120",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 1,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1120S",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 1,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "2290",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 1,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    // PayRole Tax Account Transcript
    {
      isChecked: false,
      formNumber: "940",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 2,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
      showQuarter: true,
    },
    {
      isChecked: false,
      formNumber: "943",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 2,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "944",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 2,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "945",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 2,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "941",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 2,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
    // Tax Return  Transcript
    {
      isChecked: false,
      formNumber: "1065",
      fromTaxYear: "2020",
      toTaxYear: "2023",
      productType: "RETR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 3,
      minYear: "2020",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1120",
      fromTaxYear: "2020",
      toTaxYear: "2023",
      productType: "RETR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 3,
      minYear: "2020",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1120A",
      fromTaxYear: "2020",
      toTaxYear: "2023",
      productType: "RETR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 3,
      minYear: "2020",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1120H",
      fromTaxYear: "2020",
      toTaxYear: "2023",
      productType: "RETR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 3,
      minYear: "2020",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1120L",
      fromTaxYear: "2020",
      toTaxYear: "2023",
      productType: "RETR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 3,
      minYear: "2020",
      maxYear: new Date().getFullYear(),
    },
    {
      isChecked: false,
      formNumber: "1120S",
      fromTaxYear: "2020",
      toTaxYear: "2023",
      productType: "RETR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 3,
      minYear: "2020",
      maxYear: new Date().getFullYear(),
    },

    // Civil Penalty  Transcripts

    {
      isChecked: false,
      formNumber: "CIVIL PENALTY",
      fromTaxYear: "2000",
      toTaxYear: "2024",
      productType: "ACTR",
      purposeType: "HUD",
      quarterFrom: "",
      quarterTo: "",
      taxFormTypeId: 4,
      minYear: "1990",
      maxYear: new Date().getFullYear(),
    },
  ];

  const [transcripts, setTranscripts] = useState(initialState);

  const handleYearChange = (index, fieldName, newValue) => {
    const selectedYear = parseInt(newValue);
    const updatedTranscripts = transcripts.map((item, idx) => {
      if (idx === index) {
        if (fieldName === "fromTaxYear" && selectedYear > item.toTaxYear) {
          toast("From year cannot be later than To year!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "error",
          });
          return item;
        }

        if (fieldName === "toTaxYear" && selectedYear < item.fromTaxYear) {
          toast("To year cannot be earlier than From year!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "error",
          });
          return item;
        }

        return { ...item, [fieldName]: newValue };
      }
      return item;
    });
    setTranscripts(updatedTranscripts);
  };

  const handleCheckboxChange = () => {};
  const handleMonthChange = () => {};
  const columns = useMemo(
    () => [
      {
        name: "Form No",
        selector: "formNumber",
        center: true,
        width: "250px",
        cell: (row, index) => {
          // Corrected the way to define variable inside the cell function
          const _checked = row.isChecked; // Assuming 'isChecked' is the correct field name

          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Input
                type="checkbox"
                className="me-5"
                checked={_checked}
                onChange={() => handleYearChange(index, "isChecked", !_checked)}
              />
              {`Account Transcript - ${row.formNumber}`}
            </div>
          );
        },
      },
      {
        name: "From",
        selector: "fromTaxYear",
        center: true,
        cell: (row, index) => (
          <YearPicker
            minYear={+row.minYear}
            maxYear={row.maxYear}
            handleChange={(e) =>
              handleYearChange(index, "fromTaxYear", e.target.value)
            }
            name={`fromTaxYear-${index}`}
            value={row.fromTaxYear}
          />
        ),
      },
      ,
      {
        name: "To",
        selector: "toTaxYear",
        center: true,
        cell: (row, index) => (
          <YearPicker
            minYear={+row.minYear}
            maxYear={row.maxYear}
            handleChange={(e) =>
              handleYearChange(index, "toTaxYear", e.target.value)
            }
            name={`toTaxYear-${index}`}
            value={row.toTaxYear}
          />
        ),
      },
      {
        name: "Fiscal Start",
        selector: "quarterFrom",
        center: true,
        sortable: true,
        cell: (row, index) =>
          row.showQuarter ? (
            <QuarterPicker
              selectedYear={row.fromTaxYear}
              handleChange={(e) =>
                handleYearChange(index, "quarterFrom", e.target.value)
              }
              name={`quarterFrom-${index}`}
              value={row.quarterFrom}
            />
          ) : null,
      },
      {
        name: "Fiscal End",
        selector: "quarterTo",
        center: true,
        sortable: true,
        cell: (row, index) =>
          row.showQuarter ? (
            <QuarterPicker
              selectedYear={row.toTaxYear}
              handleChange={(e) =>
                handleYearChange(index, "quarterTo", e.target.value)
              }
              name={`quarterTo-${index}`}
              value={row.quarter}
            />
          ) : null,
      },
    ],
    [handleCheckboxChange, handleYearChange, handleMonthChange, years, months]
  );

  const handlePayload = () => {
    const transcriptDetails = [...transcripts]?.filter(
      (item) => item.isChecked
    );
    const payload = {
      // federalTaxId: userDetail.taxId || "",
      // type: userDetail.type,
      // publicId: userDetail.publicId,
      // accountId: userDetail.id,
      // cafNumber: userDetail.TaxPro?.cafNumber || "",
      // legalBusinessName: userDetail.legalBusinessName,
      // firstName: userDetail.firstName || "",
      // lastName: userDetail.lastName || "",
      transcriptsDetails: transcriptDetails,
    };

    return payload;
  };

  console.log("userDetail", userDetail);

  const handleSubmit = () => {
    // Handle API calls
    navigate("transcripts");
    toggleModal();

    const payload = handlePayload();
    dispatch(addTranscripttolocal(payload));
    console.log("payload", payload);
  };

  // console.log("transcripts", transcripts);
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} size="lg">
      <ModalHeader
        toggle={toggleModal}
        className="bg-primary text-center text-white"
      >
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
        <FormGroup>
          <Input
            id="selectAll"
            name="selectAll"
            type="checkbox"
            // checked={selectAllChecked}
            // onChange={handleSelectAllChange}
          />
          <Label for="select_all" className="ms-3">
            Select All
          </Label>
        </FormGroup>
        <DataTable
          columns={columns}
          data={transcripts}
          pagination={false} // Hide pagination
          sortable
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
