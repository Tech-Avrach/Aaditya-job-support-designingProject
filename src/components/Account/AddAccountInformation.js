import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
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
} from "reactstrap";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createAccount,
  updateUser,
  updateUserType,
} from "../../redux/actions/account";
import taxProService from "../../redux/services/taxpro.service";
import IconContainer from "../Common/IconContainer";
import * as Ionicons from "react-icons/io";
import ViewAccount from "./ViewAccount";
const EditIcon = Ionicons["IoIosCreate"];

//Configure toastify
toast.configure();

const AddAccountInformation = (props) => {
  const [userDetail] = useOutletContext()|| []
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState({ type: "0" });
  //states for handling validations

  const [firstNameErr, setFirstNameErr] = useState("");
  const [lastNameErr, setLastNameErr] = useState("");
  const [middleInitialErr, setMiddleInitialErr] = useState("");
  const [legalBusinessNameErr, setlegalBusinessNameErr] = useState("");
  const [DBAErr, setDBAErr] = useState("");
  const [taxIdErr, setTaxIdErr] = useState("");
  const [federalTaxIdErr, setFederalTaxIdErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [taxProIdErr, setTaxProId] = useState("");
  const [cafNumberErr, setCafNumberErr] = useState("");
  const [contactNumberErr, setcontactNumberErr] = useState("");

  const [taxProList, setTaxProList] = useState([]);

  const [selectedName, setSelectedName] = useState(null);
  const [type, setType] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isView, setIsView ] = useState(false)

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "taxProId") {
      const selectedId = parseInt(value);
      const selected = taxProList.find((item) => item.id === selectedId);

      setSelectedName(selected);
      setCurrentUser({
        ...currentUser,
        taxProId: value, // Set taxProId directly
        cafNumber: selected ? selected.cafNumber : "", // Set cafNumber from selected item if available
      });
      setCafNumberErr("");
    } else if (name === "type") {
      dispatch(updateUserType(value));
      const selectedId = parseInt(value);
      setType(selectedId);
      if (value !== "1") {
        setCurrentUser((prev) => {
          return {
            ...prev,
            [name]: value,
            // taxId: "",
          };
        });
      } else {
        setCurrentUser((prev) => {
          return {
            ...prev,
            [name]: value,
            // federalTaxId: "",
          };
        });
      }
    } else {
      setCurrentUser({
        ...currentUser,
        [name]: value,
      });
    }
  };
  // DateChange handler
  const handleDateChange = (date) => {
    setSelectedDate(date.target.value);
    setCurrentUser({
      ...currentUser,
      dob: date.target.value,
    });
  };
  //validation handler
  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();
    const inputFieldName = event.target.name;

    //set error message for Federal Tax Id
    if (inputFieldName === "taxId") {
      const federalTaxIdRegex = /^\d{3}-\d{2}-\d{4}$/;

      if (inputValue.length !== 0 && !federalTaxIdRegex.test(inputValue)) {
        setTaxIdErr("Please enter a valid Tax Id! XXX-XX-XXXX");
      } else {
        setTaxIdErr("");
      }
    }

    //set error message for firstName
    if (inputFieldName === "legalBusinessName") {
      if (inputValue.length < 3) {
        setlegalBusinessNameErr("Please enter atleast 3 characters!");
      } else {
        setlegalBusinessNameErr("");
      }
    }

    //set error message for firstName
    if (inputFieldName === "firstName") {
      if (inputValue.length < 3) {
        setFirstNameErr("Please enter atleast 3 characters!");
      } else {
        setFirstNameErr("");
      }
    }

    //set error message for lastName
    if (inputFieldName === "lastName") {
      if (inputValue.length < 3) {
        setLastNameErr("Please enter atleast 3 characters!");
      } else {
        setLastNameErr("");
      }
    }

    if (inputFieldName === "middleInitial") {
      if (inputValue.length > 2) {
        setMiddleInitialErr("Please enter maximum 2 characters!");
      } else {
        setMiddleInitialErr("");
      }
    }

    // ===>set error message for email
    if (inputFieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!emailRegex.test(inputValue) && inputValue.length !== 0) {
        setEmailErr("Please enter a valid email address!");
      } else {
        setEmailErr("");
      }
    }

    //===>set error message for phoneNumber
    if (inputFieldName === "phoneNumber") {
      const emphoneNumberRegex = /^\d{10}$/;

      if (inputValue.length !== 0 && !emphoneNumberRegex.test(inputValue)) {
        setcontactNumberErr("Please enter a 10 digit phone number!");
      } else {
        setcontactNumberErr("");
      }
    }

    //set error message for Federal Tax Id
    if (inputFieldName === "federalTaxId") {
      const federalTaxIdRegex = /^\d{2}-\d{7}$/;

      if (inputValue.length !== 0 && !federalTaxIdRegex.test(inputValue)) {
        setFederalTaxIdErr("Please enter a valid Federal Tax Id! XX-XXXXXXX");
      } else {
        setFederalTaxIdErr("");
      }
    }
  };

  // Update Handler
  const updateHandler = (event) => {
    event.preventDefault();

    let payload;
    let errorCount = 0;
    if (currentUser.type != 1) {
      // Tax Id Validation
      const federalTaxIdRegex = /^\d{3}-\d{2}-\d{4}$/;

      if (
        currentUser.taxId === null ||
        currentUser.taxId === "" ||
        currentUser.taxId === undefined ||
        !federalTaxIdRegex.test(currentUser.taxId)
      ) {
        errorCount++;
        setTaxIdErr("Please enter a valid Tax Id! XXX-XX-XXXX");
      } else {
        setTaxIdErr("");
      }

      // First Name
      if (
        currentUser.firstName === "" ||
        currentUser.firstName === null ||
        currentUser.firstName === undefined ||
        currentUser.firstName < 3
      ) {
        setFirstNameErr("Please enter atleast 3 characters!");
        errorCount++;
      } else {
        setFirstNameErr("");
      }

      // Last Name
      if (
        currentUser.lastName === "" ||
        currentUser.lastName === null ||
        currentUser.lastName === undefined ||
        currentUser.lastName > 2
      ) {
        setLastNameErr("Please enter atleast 3 characters!");
        errorCount++;
      } else {
        setLastNameErr("");
      }

      let _currentUser = { ...currentUser };
      delete _currentUser.federalTaxId;
      payload = _currentUser;
    } else {
      // legalBusinessName
      if (
        currentUser.legalBusinessName === "" ||
        currentUser.legalBusinessName === null ||
        currentUser.legalBusinessName === undefined
      ) {
        errorCount++;
        setlegalBusinessNameErr("BusinessName is required!");
      } else {
        setlegalBusinessNameErr("");
      }
      //federalTaxId
      const federalTaxIdRegex = /^\d{2}-\d{7}$/;

      if (
        currentUser.federalTaxId === null ||
        currentUser.federalTaxId === "" ||
        currentUser.federalTaxId === undefined ||
        !federalTaxIdRegex.test(currentUser.federalTaxId)
      ) {
        errorCount++;
        setFederalTaxIdErr("Please enter a valid Federal Tax Id! XX-XXXXXXX");
      } else {
        setFederalTaxIdErr("");
      }

      let _currentUser = { ...currentUser };
      delete _currentUser.taxId;
      payload = _currentUser;
    }
    if (errorCount > 0) {
      return;
    } else {
      dispatch(updateUser(id, payload))
        .then((response) => {
          toast("Account Updated successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
          // setCurrentUser({});
          // navigate("/account/list");
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
    }
  };

  //Add form handler
  const addHandler = (event) => {
    event.preventDefault();
    let errorCount = 0;
    const formData = new FormData();
    if (currentUser.type !== null && currentUser.type !== undefined) {
      formData.append("type", currentUser.type);
    }

    if (currentUser.taxProId !== null && currentUser.taxProId !== undefined) {
      formData.append("taxProId", currentUser.taxProId);
    }

    if (
      currentUser.cafNumber === null ||
      currentUser.cafNumber === "" ||
      currentUser.cafNumber === undefined
    ) {
      errorCount++;
      setCafNumberErr("CAF Number is required!");
    } else {
      formData.append("cafNumber", currentUser.cafNumber);
      setCafNumberErr("");
    }

    if (currentUser.type !== "1") {
      if (
        currentUser.taxId === null ||
        currentUser.taxId === "" ||
        currentUser.taxId === undefined
      ) {
        errorCount++;
        setTaxIdErr("Tax Id is required!");
      } else {
        formData.append("taxId", currentUser.taxId);
        setTaxIdErr("");
      }

      // First Name
      if (
        currentUser.firstName === "" ||
        currentUser.firstName === null ||
        currentUser.firstName === undefined ||
        currentUser.firstName < 3
      ) {
        setFirstNameErr("Please enter atleast 3 characters!");

        errorCount++;
      } else {
        formData.append("firstName", currentUser.firstName);

        setFirstNameErr("");
      }
      // Middle Name
      if (
        currentUser.middleInitial !== null &&
        currentUser.middleInitial !== undefined
      ) {
        formData.append("middleInitial", currentUser.middleInitial);
      }

      // Last Name
      if (
        currentUser.lastName === "" ||
        currentUser.lastName === null ||
        currentUser.lastName === undefined ||
        currentUser.lastName > 2
      ) {
        setLastNameErr("Please enter atleast 3 characters!");
        errorCount++;
      } else {
        formData.append("lastName", currentUser.lastName);

        setLastNameErr("");
      }
    } else {
      //
      if (
        currentUser.legalBusinessName === "" ||
        currentUser.legalBusinessName === null ||
        currentUser.legalBusinessName === undefined
      ) {
        errorCount++;
        setlegalBusinessNameErr("BusinessName is required!");
      } else {
        formData.append("legalBusinessName", currentUser.legalBusinessName);
        setlegalBusinessNameErr("");
      }
      //
      if (
        currentUser.federalTaxId === null ||
        currentUser.federalTaxId === "" ||
        currentUser.federalTaxId === undefined
      ) {
        errorCount++;
        setFederalTaxIdErr("Tax Id is required!");
      } else {
        formData.append("federalTaxId", currentUser.federalTaxId);
        setFederalTaxIdErr("");
      }
    }

    // Email
    if (
      currentUser.email !== "" &&
      currentUser.email !== undefined &&
      currentUser.email !== null
    ) {
      formData.append("email", currentUser.email);
    }
    // phone Number
    if (
      currentUser.phoneNumber !== "" &&
      currentUser.phoneNumber !== null &&
      currentUser.phoneNumber !== undefined
    ) {
      formData.append("phoneNumber", currentUser.phoneNumber);
    }

    // DBA Name
    if (
      currentUser.dbaName !== "" &&
      currentUser.dbaName !== null &&
      currentUser.dbaName !== undefined
    ) {
      formData.append("dbaName", currentUser.dbaName);
    }
    // DOB
    if (currentUser.dob !== null && currentUser.dob !== undefined) {
      formData.append("dob", currentUser.dob);
    }

    //===> Address1
    if (
      currentUser.address1 !== "" &&
      currentUser.address1 !== undefined &&
      currentUser.address1 !== null
    ) {
      formData.append("address1", currentUser.address1);
    }

    // Address2
    if (
      currentUser.address2 !== "" &&
      currentUser.address2 !== null &&
      currentUser.address2 !== undefined
    ) {
      formData.append("address2", currentUser.address2);
    }

    // ===>City
    if (
      currentUser.city !== "" &&
      currentUser.city !== undefined &&
      currentUser.city !== null
    ) {
      formData.append("city", currentUser.city);
    }
    // ===>State
    if (
      currentUser.state !== "" &&
      currentUser.state !== undefined &&
      currentUser.state !== null
    ) {
      formData.append("state", currentUser.state);
    }

    // ===>Zip Code
    if (
      currentUser.zipCode !== "" &&
      currentUser.zipCode !== undefined &&
      currentUser.zipCode !== null
    ) {
      formData.append("zipCode", currentUser.zipCode);
    }
    if (errorCount > 0) {
      return;
    } else {
      // return;
      //dispatch to update the user
      dispatch(createAccount(formData))
        .then((response) => {
          // console.log("response", response);
          // "kHz3usE5"
          let _publicId = response.data?.accountDetails?.TaxPro?.publicId;
          setCurrentUser({ ...currentUser });
          toast("Account Added successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
          setCurrentUser({});
          // navigate(`/account/${_publicId}`);
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
    }
  };

  const countries = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    { code: "+1", name: "Canada" },
    { code: "+33", name: "France" },
    { code: "+49", name: "Germany" },
    { code: "+81", name: "Japan" },
  ];
  const getTaxPro = () => {
    taxProService
      .getTaxList()
      .then((response) => {
        if (response?.data?.taxProList?.rows?.length > 0) {
          let _rows = response?.data?.taxProList?.rows?.filter(
            (item) => item.deletedAt === null
          );
          setTaxProList(_rows);
        }
      })
      .catch((error) => {
        toast(error, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
      });
  };

  // setCurrentUser

  useEffect(() => {
    if (userDetail !== undefined && id) {
      setCurrentUser({ ...userDetail, federalTaxId: userDetail.taxId });
    }
  }, [userDetail]);

  useEffect(() => {
    getTaxPro();
  }, []);

  useEffect(() => {
    id && hanldeViewPage();
  }, [id]);

  useEffect(() => {
    dispatch(updateUserType(currentUser.type));
  }, [currentUser.type]);

  // View Page

  const hanldeViewPage = () => {
    setIsView(!isView);
  };

  return (
    <>
      {isView ? (
        <ViewAccount
          hanldeViewPage={hanldeViewPage}
          userDetail={userDetail}
          taxProList={taxProList}
        />
      ) : (
        <Row>
          {id && (
            <Col md={{ size: 1, offset: 11 }}>
              <IconContainer
                id="edit-icon"
                fontSize={"25px"}
                Icon={EditIcon}
                text="Edit"
                handleOnClick={() => {
                  hanldeViewPage();
                }}
      
              />
            </Col>
          )}

          <Col md="12">
            <Card className="main-card mb-3">
              <Form>
                <CardBody>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="type">
                          Select Account Type
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          type="select"
                          name="type"
                          id="type"
                          value={currentUser.type}
                          onChange={handleInputChange}
                          defaultValue={0}
                        >
                          <option key={0} value={0}>
                            Individual
                          </option>
                          <option key={1} value={1}>
                            Business
                          </option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      {currentUser?.type != "1" ? (
                        <FormGroup>
                          <Label for="taxId">
                            Tax Id<span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            invalid={taxIdErr !== "" ? true : false}
                            type="text"
                            name="taxId"
                            id="taxId"
                            placeholder="Tax Id..."
                            onChange={handleInputChange}
                            onKeyUp={handleValidation}
                            value={currentUser ? currentUser.taxId : ""}
                          />
                          {taxIdErr !== "" && (
                            <FormFeedback>{taxIdErr}</FormFeedback>
                          )}
                        </FormGroup>
                      ) : (
                        <FormGroup>
                          <Label for="federalTaxId">
                            Federal Tax Id
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <Input
                            invalid={federalTaxIdErr !== "" ? true : false}
                            type="text"
                            name="federalTaxId"
                            id="federalTaxId"
                            placeholder="Federal Tax Id..."
                            onChange={handleInputChange}
                            onKeyUp={handleValidation}
                            value={currentUser ? currentUser.federalTaxId : ""}
                          />
                          {federalTaxIdErr !== "" && (
                            <FormFeedback>{federalTaxIdErr}</FormFeedback>
                          )}
                        </FormGroup>
                      )}
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="taxProId">
                          Select Tax Pro
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          invalid={taxProIdErr !== "" ? true : false}
                          type="select"
                          name="taxProId"
                          id="taxProId"
                          value={currentUser.taxProId}
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        >
                          <option value="">Select TaxPro</option>
                          {taxProList.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </Input>
                        {taxProIdErr !== "" && (
                          <FormFeedback>{taxProIdErr}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="cafNumber">
                          CAF Number
                          <span style={{ color: "red" }}>*</span>
                        </Label>
                        <Input
                          invalid={cafNumberErr !== "" ? true : false}
                          type="text"
                          name="cafNumber"
                          id="cafNumber"
                          placeholder="CAF Number..."
                          value={
                            currentUser?.TaxPro?.cafNumber ??
                            selectedName?.cafNumber ??
                            ""
                          }
                          disabled
                        />
                        {cafNumberErr !== "" && (
                          <FormFeedback>{cafNumberErr}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    {currentUser?.type == 1 && (
                      <>
                        <Col md="4">
                          <FormGroup>
                            <Label for="legalBusinessName">
                              Legal Business Name
                              <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                              invalid={
                                legalBusinessNameErr !== "" ? true : false
                              }
                              type="text"
                              name="legalBusinessName"
                              id="legalBusinessName"
                              placeholder="Legal Business here..."
                              value={
                                currentUser.legalBusinessName
                                  ? currentUser.legalBusinessName
                                  : ""
                              }
                              onChange={handleInputChange}
                              onKeyUp={handleValidation}
                            />
                            {legalBusinessNameErr !== "" && (
                              <FormFeedback>
                                {legalBusinessNameErr}
                              </FormFeedback>
                            )}
                          </FormGroup>
                        </Col>

                        <Col md="4">
                          <FormGroup>
                            <Label for="dbaName">DBA Name</Label>
                            <Input
                              type="text"
                              name="dbaName"
                              id="dbaName"
                              placeholder="DBA Name here..."
                              value={
                                currentUser.dbaName ? currentUser.dbaName : ""
                              }
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </>
                    )}
                    {currentUser?.type == 0 && (
                      <>
                        <Col md="4">
                          <FormGroup>
                            <Label for="firstName">
                              First Name
                              <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                              invalid={firstNameErr !== "" ? true : false}
                              type="text"
                              name="firstName"
                              id="firstName"
                              placeholder="First Name here..."
                              value={
                                currentUser.firstName
                                  ? currentUser.firstName
                                  : ""
                              }
                              onChange={handleInputChange}
                              onKeyUp={handleValidation}
                            />
                            {firstNameErr !== "" && (
                              <FormFeedback>{firstNameErr}</FormFeedback>
                            )}
                          </FormGroup>
                        </Col>

                        <Col md="4">
                          <FormGroup>
                            <Label for="middleInitial">Middle Initial</Label>
                            <Input
                              invalid={middleInitialErr !== "" ? true : false}
                              type="text"
                              name="middleInitial"
                              id="middleInitial"
                              placeholder="Middle Initial here..."
                              value={
                                currentUser.middleInitial
                                  ? currentUser.middleInitial
                                  : ""
                              }
                              onChange={handleInputChange}
                              onKeyUp={handleValidation}
                            />
                            {middleInitialErr !== "" && (
                              <FormFeedback>{middleInitialErr}</FormFeedback>
                            )}
                          </FormGroup>
                        </Col>
                      </>
                    )}
                    {currentUser?.type == 0 && (
                      <>
                        <Col md="4">
                          <FormGroup>
                            <Label for="lastName">
                              Last Name
                              <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                              invalid={lastNameErr !== "" ? true : false}
                              type="text"
                              name="lastName"
                              id="lastName"
                              placeholder="Last Name here..."
                              value={
                                currentUser.lastName ? currentUser.lastName : ""
                              }
                              onChange={handleInputChange}
                              onKeyUp={handleValidation}
                            />
                            {lastNameErr !== "" && (
                              <FormFeedback>{lastNameErr}</FormFeedback>
                            )}
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <Label for="addressOne">Date of Birth</Label>
                            <input
                              type="date"
                              className="form-control"
                              onChange={handleDateChange}
                              value={currentUser.dob}
                              max={new Date().toISOString().split("T")[0]}
                            ></input>
                          </FormGroup>
                        </Col>
                      </>
                    )}
                    <Col md="4">
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          invalid={emailErr !== "" ? true : false}
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email address here..."
                          value={currentUser.email ? currentUser.email : ""}
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                        {emailErr !== "" && (
                          <FormFeedback>{emailErr}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Phone Number</Label>
                        <Input
                          invalid={contactNumberErr !== "" ? true : false}
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="Phone Number here..."
                          value={
                            currentUser.phoneNumber
                              ? currentUser.phoneNumber
                              : ""
                          }
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                        {contactNumberErr !== "" && (
                          <FormFeedback>{contactNumberErr}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label for="address1"> Address 1</Label>
                        <Input
                          type="text"
                          name="address1"
                          id="address1"
                          placeholder="Address..."
                          value={
                            currentUser.address1 ? currentUser.address1 : ""
                          }
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="address2">Address 2</Label>
                        <Input
                          type="text"
                          name="address2"
                          id="address2"
                          placeholder="Address..."
                          value={
                            currentUser.address2 ? currentUser.address2 : ""
                          }
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="city">City</Label>
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="City here..."
                          value={currentUser.city ? currentUser.city : ""}
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="state">State</Label>
                        <Input
                          type="text"
                          name="state"
                          id="state"
                          placeholder="State here..."
                          value={currentUser.state ? currentUser.state : ""}
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="zipCode">Zip Code</Label>
                        <Input
                          type="text"
                          name="zipCode"
                          id="zipCode"
                          placeholder="Zip code here..."
                          value={currentUser.zipCode ? currentUser.zipCode : ""}
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                      </FormGroup>
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
                  {id ? (
                    <Button size="lg" color="primary" className="me-2" onClick={updateHandler}>
                      Save
                    </Button>
                  ) : (
                    <Button size="lg" color="primary" className="me-2" onClick={addHandler}>
                      Add Account
                    </Button>
                  )}
                  {/* <Button size="lg" color="primary" className="me-2">
                  Request Transcripts
              </Button>
              <Button size="lg" color="primary" className="me-2">
                  Download Report
              </Button> */}
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AddAccountInformation;
