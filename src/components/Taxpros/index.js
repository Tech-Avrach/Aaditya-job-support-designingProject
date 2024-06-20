import React, { useEffect, useState } from "react";
import PageContainer from "../Layout/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "reactstrap";
import styles from "../../assets/preview.module.scss";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TaxProlistDetails,
  createTaxProlist,
  updateTaxPro,
} from "../../redux/actions/taxpro";
import { event } from "jquery";
//Configure toastify
toast.configure();

const AddTaxpros = () => {
  const [currentUser, setCurrentUser] = useState({});
  //states for handling validations
  const { id } = useParams();
  const [nameErr, setnameErr] = useState("");
  const [cafNumberError, setCAFNumberError] = useState("");
  const [currentTaxPro, setCurrentTaxPro] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (!/\d+/.test(id)) {
      navigate("/taxpros/add");
    }
  }, [id, navigate]);
  const getTaxProDetail = (id) => {
    dispatch(TaxProlistDetails(id))
      .then((response) => {
        setCurrentUser({ ...response.taxProDetails });
      })
      .catch((error) => {
        toast(error.response.data.message, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
      });
  };

  useEffect(() => {
    if (id != "" && /\d+/.test(id)) getTaxProDetail(id);
  }, [id]);

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCurrentUser({ ...currentUser, [name]: value });
  };

  //validation handler
  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;

    //set error message for name
    if (inputFieldName === "name") {
      if (inputValue.length < 3) {
        setnameErr("Please enter atleast 3 characters!");
      } else {
        setnameErr("");
      }
    }
  };

  const handleCAFValidation = (event) => {
    // Define the regex pattern for the format "0314-90136"
    const regex = /^\d{4}-\d{5}$/;

    // Test the input string against the regex pattern
    if (regex.test(event.target.value)) {
      setCAFNumberError("");
    } else {
      setCAFNumberError("CAF Number must be in the format XXXX-XXXXX");
    }
  };

  const addHandler = () => {
    const data = {
      name: currentUser.name,
      cafNumber: currentUser.cafNumber,
    };
    dispatch(createTaxProlist(data))
      .then((response) => {
        toast(response.message, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "success", // info/success/warning/error
        });
        navigate(`/taxpros/list`);
      })
      .catch((error) => {
        toast(error.response.message, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
      });
  };
  const updateHandler = (event) => {
    event.preventDefault();
    const dataToUpdate = {
      name: currentUser.name,
      cafNumber: currentUser.cafNumber,
    };
    dispatch(updateTaxPro(id, dataToUpdate))
      .then((response) => {
        toast("Tax Pro Updated successfully!", {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "success", // info/success/warning/error
        });
        setCurrentUser({});
        navigate("/taxpros/list");
      })
      .catch((error) => {
        toast(error.response.data.message, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
      });
  };
  return (
    <PageContainer
      pageTitleIcon="pe-7s-add-user icon-gradient bg-plum-plate"
      pageHeading={"Add Tax Pros"}
      pageSubTitle={"Save new tax pros"}
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            {/* <CardHeader className="card-header-sm">
                    <div className="card-header-title font-size-lg text-capitalize fw-normal">
                      Profile Information
                    </div>
                  </CardHeader> */}
            <Form>
              <CardBody>
                <CardTitle>Tax Pro Information</CardTitle>
                <div className="divider" />
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        invalid={nameErr !== "" ? true : false}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Full Name here..."
                        value={currentUser.name ? currentUser.name : ""}
                        onChange={handleInputChange}
                        onKeyUp={handleValidation}
                      />
                      {nameErr !== "" && <FormFeedback>{nameErr}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="cafNumber">CAF Number</Label>
                      <Input
                        invalid={cafNumberError !== "" ? true : false}
                        type="text"
                        name="cafNumber"
                        id="cafNumber"
                        placeholder="CAF Number here..."
                        value={
                          currentUser.cafNumber ? currentUser.cafNumber : ""
                        }
                        onChange={handleInputChange}
                        onKeyUp={handleCAFValidation}
                      />
                      {cafNumberError !== "" && (
                        <FormFeedback>{cafNumberError}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="d-block">
                <Button
                  className="me-2"
                  color="link"
                  onClick={() => {
                    navigate(`/taxpros/list`);
                  }}
                >
                  Cancel
                </Button>
                {id ? (
                  <Button size="lg" color="primary" onClick={updateHandler}>
                    Update Tax Pro
                  </Button>
                ) : (
                  <Button size="lg" color="primary" onClick={addHandler}>
                    Add Tax Pro
                  </Button>
                )}
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default AddTaxpros;
