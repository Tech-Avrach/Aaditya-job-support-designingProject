import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { createTranscript } from "../../redux/actions/tranScript";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loaders";

toast.configure();

const IndividualRequestTranscript = ({ userDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const handleSelectAllChange = () => {
    const newSelectAllState = !selectAllChecked;
    setSelectAllChecked(newSelectAllState);

    // Update all group checkbox states
    setCheckboxStates({
      // taxReturnAcco: newSelectAllState,
      taxReturnAccount: newSelectAllState,
      returnOfAccount: newSelectAllState,
      verficationOfnonfiling: newSelectAllState,
      wagesIncome: newSelectAllState,
      civilPenality: newSelectAllState,
      separateAssessment: newSelectAllState,
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
    // taxReturnAcco: false,
    taxReturnAccount: false,
    returnOfAccount: false,
    verficationOfnonfiling: false,
    wagesIncome: false,
    civilPenality: false,
    separateAssessment: false,
  });

  const initialState = {
    // Individual Tax Return Acco Transcripts
    // taxReturnAcco: [
    //   {
    //     formNumber: 1040,
    //     fromTaxYear: "2022",
    //     toTaxYear: "2023",
    //     productType: "RETR",
    //     purposeType: "HUD",
    //     taxFormTypeId: 5,
    //   },
    // ],
    // Individual Tax Return Account Transcripts
    taxReturnAccount: [
      {
        formNumber: "1040",
        fromTaxYear: "2020",
        toTaxYear: "2023",
        productType: "RETR",
        purposeType: "HUD",
        taxFormTypeId: 5,
        quarterFrom: "",
        quarterTo: "",
      },
    ],
    // Record of Account Transcripts
    returnOfAccount: [
      {
        formNumber: "1040",
        fromTaxYear: "2020",
        toTaxYear: "2023",
        productType: "RECA",
        purposeType: "HUD",
        taxFormTypeId: 6,
        quarterFrom: "",
        quarterTo: "",
      },
    ],
    // Verification of non-filing Transcript
    verficationOfnonfiling: [
      {
        formNumber: "1040",
        fromTaxYear: "2020",
        toTaxYear: "2023",
        productType: "VENF",
        purposeType: "HUD",
        taxFormTypeId: 7,
        quarterFrom: "",
        quarterTo: "",
      },
    ],
    // Wages & Income Transcript
    wagesIncome: [
      {
        formNumber: "ALL FORMS",
        fromTaxYear: "2020",
        toTaxYear: "2023",
        productType: "WAID",
        purposeType: "HUD",
        taxFormTypeId: 8,
        quarterFrom: "",
        quarterTo: "",
      },
    ],
    // Civil Penalty Transcript
    civilPenality: [
      {
        formNumber: "1040",
        fromTaxYear: "2020",
        toTaxYear: "2023",
        productType: "ACTR",
        purposeType: "HUD",
        taxFormTypeId: 4,
        quarterFrom: "",
        quarterTo: "",
      },
    ],
    // Separate Assessment Transcript

    separateAssessment: [
      {
        formNumber: "1040 SEPARATE ASSESSMENT",
        fromTaxYear: "2020",
        toTaxYear: "2023",
        productType: "ACTR",
        purposeType: "HUD",
        taxFormTypeId: 9,
        quarterFrom: "",
        quarterTo: "",
      },
    ],
  };

  const [transcripts, setTranscripts] = useState(initialState);
  const handleYearChange = (group, index, field, year) => {
    const selectedYear = parseInt(year, 10);
    const newTranscripts = [...transcripts[group]];
    newTranscripts[index][field] = year;
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

  const [isLoading, setIsLoading] = useState(false);

  const handlePayload = () => {
    const transcriptDetails = [
      // ...transcripts.taxReturnAcco,
      ...transcripts.taxReturnAccount,
      ...transcripts.returnOfAccount,
      ...transcripts.verficationOfnonfiling,
      ...transcripts.wagesIncome,
      ...transcripts.civilPenality,
      ...transcripts.separateAssessment,
    ].filter((item) => item.isChecked);
    const payload = {
      taxId: userDetail.taxId || "",
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

  // Handle is All Checked
  const isAllChecked = () => {
    const _pdfFilesId = [
      ...transcripts.taxReturnAccount,
      ...transcripts.returnOfAccount,
      ...transcripts.verficationOfnonfiling,
      ...transcripts.wagesIncome,
      ...transcripts.civilPenality,
      ...transcripts.separateAssessment,
    ]
      .filter((item) => item.isChecked) // Filter to get only checked items
      ?.map((item) => item.id?.toString());
    return _pdfFilesId.length;
  };

  return (
    <Row>
      <Col md="12">
        <Card className="main-card mb-3">
          <Form>
            <CardBody>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="select_all" className="ms-3">
                      Available Transcripts to request - Individual
                    </Label>
                  </FormGroup>
                </Col>
              </Row>

              {isLoading ? (
                <Row className="justify-content-center align-items-center fade-bg">
                  <Col xs="2">
                    <Loader type="ball-spin-fade-loader" />
                  </Col>
                </Row>
              ) : (
                <></>
              )}

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
                {/* <Col md="4">
                  {renderGroup(
                    "taxReturnAcco",
                    "Individual Tax Return Acco Transcripts",
                    false,
                    2020,
                    new Date().getFullYear() - 1
                  )}
                </Col> */}
                <Col md="4">
                  {renderGroup(
                    "taxReturnAccount",
                    "Individual Tax Return Account Transcripts",
                    false,
                    2020,
                    new Date().getFullYear() - 1
                  )}
                </Col>

                <Col md="4">
                  {renderGroup(
                    "returnOfAccount",
                    "Record of Account Transcripts",
                    false,
                    2020,
                    new Date().getFullYear() - 1
                  )}
                </Col>
              </Row>

              <Row>
                <Col md="4">
                  {renderGroup(
                    "verficationOfnonfiling",
                    "Verification of non-filing Transcript",
                    false,
                    2020,
                    new Date().getFullYear() - 1
                  )}
                </Col>
                <Col md="4">
                  {renderGroup(
                    "wagesIncome",
                    "Wages & Income Transcript",
                    false,
                    2020,
                    new Date().getFullYear() - 1
                  )}
                </Col>
                <Col md="4">
                  {renderGroup(
                    "civilPenality",
                    "Civil Penalty Transcript",
                    false,
                    2020,
                    new Date().getFullYear() - 1
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  {renderGroup(
                    "separateAssessment",
                    "Separate Assessment Transcript",
                    false,
                    2020,
                    new Date().getFullYear() - 1
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

export default IndividualRequestTranscript;
