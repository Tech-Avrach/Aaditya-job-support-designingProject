import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  getCombinedTranscript,
  getTranscript,
} from "../../redux/actions/tranScript";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AvailableTableComponent from "./AvailableTranscriptTable";
import Loader from "react-loaders";

toast.configure();

const IndividualAvailableTranscripts = ({ userDetail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCombineloading, setIsCombineloading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { tranScriptDetails } = useSelector((state) => state.transcript);
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
    // Individual Tax Return Account Transcripts
    taxReturnAccount: [],
    // Record of Account Transcripts
    returnOfAccount: [],
    // Verification of non-filing Transcript
    verficationOfnonfiling: [],
    // Wages & Income Transcript
    wagesIncome: [],
    // Civil Penalty Transcript
    civilPenality: [],
    // Separate Assessment Transcript
    separateAssessment: [],
  };

  const [transcripts, setTranscripts] = useState(initialState);
  const handleYearChange = (group, index, field, year) => {
    const selectedYear = parseInt(year, 10);
    const newTranscripts = [...transcripts[group]];
    newTranscripts[index][field] = year;
    let allChecked = true;
    if (field === "quarterFrom" || field === "quarterTo") {
      newTranscripts[index][field] = year;
    } else if (field === "quarter") {
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
      <AvailableTableComponent
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

  const [formId] = useState({
    "Business Tax Return Account Transcipts": 1,
    "Payroll Tax Account Transcipts": 2,
    "Tax Return Transcipts": 3,
    "Civil Penalty Transcipts": 4,
    "Individual Tax Return Account Transcipts": 5,
    "Record of Account Transcipts": 6,
    "Verification of non-billing Transcipts": 7,
    "Wages & Income Transcipts": 8,
    "Separate Assessment Transcipts": 9,
  });

  useEffect(() => {
    const handlesetPrifilled = () => {
      const newState = {
        taxReturnAccount: [],
        returnOfAccount: [],
        verficationOfnonfiling: [],
        wagesIncome: [],
        civilPenality: [],
        separateAssessment: [],
      };
      tranScriptDetails?.forEach((item) => {
        switch (item.taxFormTypeId) {
          case formId["Individual Tax Return Account Transcipts"]:
            newState.taxReturnAccount.push({
              ...item,
              isChecked: true,
            });
            break;
          case formId["Record of Account Transcipts"]:
            newState.returnOfAccount?.push({ ...item, isChecked: true });
            break;
          case formId["Tax Return Transcipts"]:
            newState.taxReturn?.push({ ...item, isChecked: true });
            break;
          case formId["Verification of non-billing Transcipts"]:
            newState.verficationOfnonfiling?.push({ ...item, isChecked: true });
            break;
          case formId["Wages & Income Transcipts"]:
            newState.wagesIncome?.push({ ...item, isChecked: true });
            break;
          case formId["Civil Penalty Transcipts"]:
            newState.civilPenality?.push({ ...item, isChecked: true });
            break;
          case formId["Separate Assessment Transcipts"]:
            newState.separateAssessment?.push({ ...item, isChecked: true });
            break;
        }
      });
      setTranscripts(newState);
    };
    handlesetPrifilled();
  }, [tranScriptDetails]);

  console.log("tranScriptDetails",tranScriptDetails)
  console.log("userDetails",userDetail)
  
  // Get Transcript Details
  useEffect(() => {
    const handlegetTranscript = (Id) => {
      setIsLoading(true);
      dispatch(getTranscript(Id))
        .then((response) => {
          setIsLoading(false);
          // toast("Transcript Added successfully!", {
          //   transition: Slide,
          //   closeButton: true,
          //   autoClose: 3000,
          //   position: "top-right",
          //   type: "success", // info/success/warning/error
          // });
          // navigate("/account/list");
        })
        .catch((error) => {
          setIsLoading(false);
          toast(error.response?.data?.message, {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "error",
          });
        });
    };
    if (userDetail?.id != "") {
      handlegetTranscript(userDetail?.id);
    }
  }, [userDetail?.id]);

  async function downloadFromUrl(url, filename) {
    try {
      filename = url.split("/transcripts").pop();
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        // Create a URL for the blob object
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an <a> element to download the blob
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;

        // Append the link, trigger the download, then remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the blob URL after download
        window.URL.revokeObjectURL(blobUrl);
        setIsCombineloading(false);
      } else {
        throw new Error("Failed to download file: " + response.statusText);
      }
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  }

  // Download Multiple
  function downloadMultipleFiles(files) {
    files.pdfFilesId.forEach((file, index) => {
      let fileUrl = process.env.REACT_APP_TRANSCRIPT_URL + `${file}`;
      setTimeout(() => {
        downloadFromUrl(fileUrl);
      }, index * 500);
    });
  }

  const handlePayload = () => {
    const _pdfFilesId = [
      ...transcripts.taxReturnAccount,
      ...transcripts.returnOfAccount,
      ...transcripts.verficationOfnonfiling,
      ...transcripts.wagesIncome,
      ...transcripts.civilPenality,
      ...transcripts.separateAssessment,
    ]
      .filter((item) => item.isChecked) // Filter to get only checked items
      .map((item) => item.id.toString());
    const payload = {
      accountId: userDetail.id,
      pdfFilesId: _pdfFilesId,
    };

    return payload;
  };

  const handleCombineDownload = () => {
    const payload = handlePayload();
    dispatch(getCombinedTranscript(payload))
      .then((response) => {
        setIsCombineloading(true);
        let fileUrl =
          process.env.REACT_APP_TRANSCRIPT_URL +
          `${response.combinedTranscripts}`;
        downloadFromUrl(fileUrl);
      })
      .catch((error) => {
        setIsCombineloading(false);
        toast(error.response?.data?.message, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
      });
  };

  const handleSingalPayload = () => {
    const _pdfFilesId = [
      ...transcripts.taxReturnAccount,
      ...transcripts.returnOfAccount,
      ...transcripts.verficationOfnonfiling,
      ...transcripts.wagesIncome,
      ...transcripts.civilPenality,
      ...transcripts.separateAssessment,
    ]
      .filter((item) => item.isChecked) // Filter to get only checked items
      .map((item) => item.transcriptPath);
    const payload = {
      pdfFilesId: _pdfFilesId,
    };
    return payload;
  };

  const handleSingaleDownload = () => {
    const paths = handleSingalPayload();
    downloadMultipleFiles(paths);
  };

  // Download Created Transcript
  const handleDownlodedScript = () => {
    const downloadedTranscript = userDetail?.Report?.reportPath;
    let paths = { pdfFilesId: [downloadedTranscript] };
    downloadMultipleFiles(paths);
  };

  const areAllKeysEmpty = (state) => {
    return Object.values(state).every((arr) => arr.length === 0);
  };

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
      ?.map((item) => item?.id.toString());
    return _pdfFilesId.length;
  };

  return (
    <Row>
      <Col md="12">
        <Card className="main-card mb-3">
          <Form>
            <CardBody>
              {/* <Row>
                <Col md="5">
                  <FormGroup>
                    <Label for="select_all" className="ms-3">
                      Available Transcripts
                    </Label>
                  </FormGroup>
                </Col>
              </Row> */}
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
                <Col md="2">
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
                <Col md="4">
                  <Row className="justify-content-end">
                    <Col xs="5">
                      <Button
                        color="primary mb-2"
                        disabled={!userDetail?.Report?.reportPath}
                        onClick={() => handleDownlodedScript()}
                      >
                        Download Report
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col className="mb-2" md="3">
                  <Button
                    color="primary"
                    onClick={() => {
                      handleCombineDownload();
                    }}
                    disabled={
                      areAllKeysEmpty(tranScriptDetails) ||
                      !isAllChecked() ||
                      isCombineloading
                    }
                  >
                    Download selected transcript combined
                  </Button>
                </Col>
                <Col className="mb-4" md="3">
                  <Button
                    color="primary"
                    onClick={() => handleSingaleDownload()}
                    disabled={
                      areAllKeysEmpty(tranScriptDetails) ||
                      !isAllChecked() ||
                      isCombineloading
                    }
                  >
                    Download selected transcript separately
                  </Button>
                </Col>
              </Row>

              <Row>
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
              <hr />
              <Row>
                <Col md="4">
                  {renderGroup(
                    "verficationOfnonfiling",
                    "Verification of non-filing Transcript",
                    false,
                    1990,
                    new Date().getFullYear()
                  )}
                </Col>
                <Col md="4">
                  {renderGroup(
                    "wagesIncome",
                    "Wages & Income Transcript",
                    false,
                    1990,
                    new Date().getFullYear()
                  )}
                </Col>
                <Col md="4">
                  {renderGroup(
                    "civilPenality",
                    "Civil Penalty Transcript",
                    false,
                    1990,
                    new Date().getFullYear()
                  )}
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  {renderGroup(
                    "separateAssessment",
                    "Separate Assessment Transcript",
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
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default IndividualAvailableTranscripts;
