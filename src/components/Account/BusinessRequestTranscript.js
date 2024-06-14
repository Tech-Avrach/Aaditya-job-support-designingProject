import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import TableComponent from "./TableComponent";
import { createTranscript } from "../../redux/actions/tranScript";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loaders";

//Configure toastify
toast.configure();

const BusinessRequestTranscript = ({ userDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectAllChange = () => {
    const newSelectAllState = !selectAllChecked;
    setSelectAllChecked(newSelectAllState);

    // Update all group checkbox states
    setCheckboxStates({
      businessTaxReturnAccount: newSelectAllState,
      payrollTaxAccount: newSelectAllState,
      taxReturn: newSelectAllState,
      civilPenalty: newSelectAllState,
    });

    // Update all transcripts to match the new state
    setTranscripts((prev) => {
      const newTranscripts = {};
      for (const group in prev) {
        newTranscripts[group] = prev[group].map((transcript) => ({
          ...transcript,
          isChecked: newSelectAllState,
        }));
      }
      return newTranscripts;
    });
  };

  // Default All Select
  useEffect(() => {
    handleSelectAllChange();
  }, []);
  //Select All by Group By
  const [checkboxStates, setCheckboxStates] = useState({
    businessTaxReturnAccount: false,
    payrollTaxAccount: false,
    taxReturn: false,
    civilPenalty: false,
  });

  const initialState = {
    // Request Transcripts Business
    businessTaxReturnAccount: [
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
      },
    ],
    // PayRole Tax Account Transcript
    payrollTaxAccount: [
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
      },
    ],
    // Tax Return  Transcript
    taxReturn: [
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
      },
    ],
    // Civil Penalty  Transcripts
    civilPenalty: [
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
      },
    ],
  };

  const [transcripts, setTranscripts] = useState(initialState);

  const handleYearChange = (group, index, field, year) => {
    const selectedYear = parseInt(year, 10);
    const newTranscripts = [...transcripts[group]];
    newTranscripts[index][field] = selectedYear;
    let allChecked = true;
    if (field === "quarterFrom" || field === "quarterTo") {
      newTranscripts[index][field] = year;
    } else if (field === "isChecked") {
      newTranscripts[index][field] = year;
    } else if (
      field === "fromTaxYear" &&
      selectedYear > newTranscripts[index].toTaxYear &&
      newTranscripts[index].toTaxYear !== ""
    ) {
      // alert("From year cannot be later than To year.");
      toast("From year cannot be later than To year!", {
        transition: Slide,

        closeButton: true,

        autoClose: 3000,

        position: "top-right",

        type: "error",
      });

      return;
    } else if (
      field === "toTaxYear" &&
      selectedYear < newTranscripts[index].fromTaxYear &&
      newTranscripts[index].fromTaxYear !== ""
    ) {
      // alert("To year cannot be earlier than From year.");
      toast("To year cannot be earlier than From year!", {
        transition: Slide,

        closeButton: true,

        autoClose: 3000,

        position: "top-right",

        type: "error",
      });
      return;
    }
    setTranscripts((prev) => ({ ...prev, [group]: newTranscripts }));

    allChecked = newTranscripts.every((transcript) => transcript.isChecked);
    setSelectAllChecked((prev) => {
      const newState = { ...prev, [group]: allChecked };
      // Check if all groups are fully checked
      const allGroupsChecked = Object.values(newState).every((value) => value);
      return allGroupsChecked;
    });

    setCheckboxStates((prev) => {
      const newState = {
        ...prev,
        [group]: newTranscripts.every((t) => t.isChecked),
      };
      // Determine if all checkboxes are checked after this update
      const allChecked = Object.values(newState).every((value) => value);
      setSelectAllChecked(allChecked);

      return newState;
    });
  };

  const handleCheckboxChange = (group) => {
    setCheckboxStates((prev) => {
      const newState = {
        ...prev,
        [group]: !prev[group],
      };

      // Determine if all checkboxes are checked after this update
      const allChecked = Object.values(newState).every((value) => value);
      setSelectAllChecked(allChecked);

      return newState;
    });

    // Update all transcripts in the group based on the new checkbox state
    setTranscripts((prev) => {
      const newGroupTranscripts = prev[group].map((transcript) => ({
        ...transcript,
        isChecked: !checkboxStates[group],
      }));
      return {
        ...prev,
        [group]: newGroupTranscripts,
      };
    });
  };

  // Handle is All Checked
  const isAllChecked = () => {
    const _pdfFilesId = [
      ...transcripts.businessTaxReturnAccount,
      ...transcripts.payrollTaxAccount,
      ...transcripts.taxReturn,
      ...transcripts.civilPenalty,
    ]
      .filter((item) => item.isChecked) // Filter to get only checked items
      ?.map((item) => item.id?.toString());
    return _pdfFilesId.length;
  };

  const renderGroup = (groupKey, label, showQuarter, minYear, maxYear) => (
    <FormGroup>
      <Input
        name="selectAll"
        type="checkbox"
        checked={checkboxStates[groupKey]}
        onChange={() => handleCheckboxChange(groupKey)}
      />
      <Label className="ms-3">{label}</Label>
      <TableComponent
        transcripts={transcripts[groupKey]}
        handleYearChange={(index, field, year) =>
          handleYearChange(groupKey, index, field, year)
        }
        showQuarter={showQuarter}
        minYear={minYear}
        maxYear={maxYear}
      />
    </FormGroup>
  );

  const handlePayload = () => {
    const transcriptDetails = [
      ...transcripts.businessTaxReturnAccount,
      ...transcripts.payrollTaxAccount,
      ...transcripts.taxReturn,
      ...transcripts.civilPenalty,
    ].filter((item) => item.isChecked);
    const payload = {
      federalTaxId: userDetail.taxId || "",
      type: userDetail.type,
      publicId: userDetail.publicId,
      accountId: userDetail.id,
      cafNumber: userDetail.TaxPro?.cafNumber || "",
      legalBusinessName: userDetail.legalBusinessName,
      firstName: userDetail.firstName || "",
      lastName: userDetail.lastName || "",
      transcriptsDetails: transcriptDetails,
    };

    return payload;
  };

  const addHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const payload = handlePayload();

    dispatch(createTranscript(payload))
      .then((response) => {
        toast("Transcript Added successfully!", {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "success", // info/success/warning/error
        });
        setIsLoading(false);
        // navigate("/account/list");
      })
      .catch((error) => {
        toast(error.response?.data?.message, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
        setIsLoading(false);
      });
  };

  console.log("transcripts==>", transcripts?.payrollTaxAccount);
  return (
    <Row>
      <Col md="12">
        <Card className="main-card mb-3">
          <Form>
            <CardBody>
              {
                isLoading ?
                  <Row className="justify-content-center align-items-center fade-bg">
                    <Col xs="1">
                      <Loader type="ball-spin-fade-loader"/>
                    </Col>
                  </Row>
                  : <></>
              }
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="select_all" className="ms-3">
                      Available Transcripts to request - Business
                    </Label>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input
                      id="selectAll"
                      name="selectAll"
                      type="checkbox"
                      checked={selectAllChecked}
                      onChange={handleSelectAllChange}
                    />
                    <Label for="select_all" className="ms-3">
                      Select All
                    </Label>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md="4">
                  {renderGroup(
                    "businessTaxReturnAccount",
                    "Business Tax Return Account Transcripts",
                    false,
                    1990,
                    new Date().getFullYear()
                  )}
                </Col>
                <Col md="4">
                  {renderGroup(
                    "payrollTaxAccount",
                    "PayRoll Tax Account Transcripts",
                    true,
                    1990,
                    new Date().getFullYear()
                  )}
                </Col>

                <Col md="4">
                  {renderGroup(
                    "taxReturn",
                    "Tax Return Transcripts",
                    false,
                    2020,
                    new Date().getFullYear() - 1
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  {renderGroup(
                    "civilPenalty",
                    "Civil Penalty Transcripts",
                    false,
                    1990,
                    new Date().getFullYear()
                  )}
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="d-block">
              <Button
                className="me-2"
                color="link"
                onClick={() => {
                  navigate(`/account/list`);
                }}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                color="primary"
                disabled={isLoading || !isAllChecked()}
                onClick={addHandler}
              >
                Submit
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default BusinessRequestTranscript;
