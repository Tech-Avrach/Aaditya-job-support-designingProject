import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import styles from '../../assets/preview.module.scss';

//Configure toastify
toast.configure();

const ProfileInformation = (props) => {
  const userDetail = props.userDetail;

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(userDetail);

  //states for handling validations
  const [selectedProfileImg, setSelectedProfileImg] = useState(null);

  const [profileImgPreview, setProfileImgPreview] = useState("");

  const [removeProfileImg, setRemoveProfileImg] = useState(false);

  const [passwordErr, setPasswordErr] = useState("");

  const [cnfPasswordErr, setCnfPasswordErr] = useState("");

  const [firstNameErr, setFirstNameErr] = useState("");

  const [emailErr, setEmailErr] = useState("");

  const [phoneNumberErr, setPhoneNumberErr] = useState("");

  const [profileImgErr, setProfileImgErr] = useState("");

  useEffect(() => {
    if (userDetail !== undefined) {
      setCurrentUser(userDetail); //set user details in the state when userDetail changes

      //set profile image preview when userDetail changes
      if (userDetail.profileImage) {
        setProfileImgPreview(
          process.env.REACT_APP_PROFILE_IMAGE_URL + userDetail.profileImage
        );
      }
    }
  }, [userDetail]);

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  //validation handler
  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();
    const inputFieldName = event.target.name;

    //set error message for firstName
    if (inputFieldName === "firstName") {
      if (inputValue.length < 3) {
        setFirstNameErr("Please enter at least 3 characters!");
      } else {
        setFirstNameErr("");
      }
    }

    //set error message for email
    if (inputFieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!emailRegex.test(inputValue) || inputValue.length === 0) {
        setEmailErr("Please enter a valid email address!");
      } else {
        setEmailErr("");
      }
    }

    //set error message for phoneNumber
    if (inputFieldName === "phoneNumber") {
      const phoneNumberRegex = /^\d{10}$/;

      if (inputValue.length !== 0 && !phoneNumberRegex.test(inputValue)) {
        setPhoneNumberErr("Please enter a 10 digit phone number!");
      } else {
        setPhoneNumberErr("");
      }
    }

    //set error message for password
    if (inputFieldName === "newPassword" && inputValue !== "") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;

      const uppercasePassword = uppercaseRegExp.test(inputValue);
      const lowercasePassword = lowercaseRegExp.test(inputValue);
      const digitsPassword = digitsRegExp.test(inputValue);
      const specialCharPassword = specialCharRegExp.test(inputValue);
      const minLengthPassword = minLengthRegExp.test(inputValue);

      let errMsg = "";

      if (!uppercasePassword) {
        errMsg = "Password must contain at least one uppercase!";
      } else if (!lowercasePassword) {
        errMsg = "Password must contain at least one lowercase";
      } else if (!digitsPassword) {
        errMsg = "Password must contain at least one digit";
      } else if (!specialCharPassword) {
        errMsg = "Password must contain at least one Special Character";
      } else if (!minLengthPassword) {
        errMsg = "Password must contain a minimum of 8 characters";
      } else {
        errMsg = "";
      }

      setPasswordErr(errMsg);

      if (inputValue !== currentUser.confirmPassword) {
        setCnfPasswordErr("Confirm password doesn't match");
      } else {
        setCnfPasswordErr("");
      }
    }

    //set error message for confirm password
    if (inputFieldName === "confirmPassword") {
      if (inputValue !== currentUser.newPassword) {
        setCnfPasswordErr("Confirm password doesn't match");
      } else {
        setCnfPasswordErr("");
      }
    }
  };

  //file input handler
  const handleFileInput = (event) => {
    setProfileImgErr("");

    let fileSize = 0;
    let errorCount = 0;

    const file = event.target.files[0];

    if (file) {
      fileSize = file.size / 1024;

      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        setProfileImgErr("Only Images are allowed! ");
        errorCount++;
      }

      //check if filesize is not more than 1MB
      if (fileSize > 1024) {
        setProfileImgErr("Please upload a file of size less than 1MB!");
        errorCount++;
      }

      if (errorCount === 0) {
        const imageAsBase64 = URL.createObjectURL(file);
        setSelectedProfileImg(file);
        setProfileImgPreview(imageAsBase64);
        setRemoveProfileImg(false);
      }
    }
  };

  const removeProfilePicture = (event) => {
    event.preventDefault();
    setProfileImgPreview("");
    setSelectedProfileImg(null);
    setRemoveProfileImg(true);
  };

  //update form handler
  const submitHandler = (event) => {
    event.preventDefault();

    let errorCount = 0;

    const formData = new FormData();

    if (
      JSON.stringify(currentUser) === "{}" ||
      currentUser.firstName === "" ||
      currentUser.firstName === null ||
      currentUser.firstName?.length < 3
    ) {
      setFirstNameErr("Please enter at least 3 characters!");
      errorCount++;
    } else {
      formData.append("firstName", currentUser.firstName);
      setFirstNameErr("");
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.lastName !== null &&
      currentUser.lastName !== undefined
    ) {
      formData.append("lastName", currentUser.lastName);
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.publicBio !== null &&
      currentUser.publicBio !== undefined
    ) {
      formData.append("publicBio", currentUser.publicBio);
    }

    if (
      JSON.stringify(currentUser) === "{}" ||
      currentUser.email === "" ||
      currentUser.email === null
    ) {
      setEmailErr("Please enter a valid email address!");
      errorCount++;
    } else {
      formData.append("email", currentUser.email);
      setEmailErr("");
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.phoneNumber !== "" &&
      currentUser.phoneNumber !== null &&
      currentUser.phoneNumber !== undefined
    ) {
      formData.append("phoneNumber", currentUser.phoneNumber);
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.addressOne !== null &&
      currentUser.addressOne !== undefined
    ) {
      formData.append("addressOne", currentUser.addressOne);
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.addressTwo !== null &&
      currentUser.addressTwo !== undefined
    ) {
      formData.append("addressTwo", currentUser.addressTwo);
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.zipCode !== null &&
      currentUser.zipCode !== undefined
    ) {
      formData.append("zipCode", currentUser.zipCode);
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.countryId !== null &&
      currentUser.countryId !== undefined
    ) {
      formData.append("countryId", currentUser.countryId ? currentUser.countryId : 226 );
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.stateCode !== null &&
      currentUser.stateCode !== undefined
    ) {
      formData.append("stateCode", currentUser.stateCode );
    }

    if (
      JSON.stringify(currentUser) !== "{}" &&
      currentUser.city !== null &&
      currentUser.city !== undefined
    ) {
      formData.append("city", currentUser.city );
    }

    if (profileImgErr !== "") {
      errorCount++;
    } else {
      setProfileImgErr("");
    }

    if (selectedProfileImg !== null) {
      formData.append("profileImage", selectedProfileImg);
    } else {
      formData.append("profileImage", "");
    }

    if (removeProfileImg) {
      formData.append("removeProfileImage", true);
    }

    if (currentUser.newPassword !== "" && currentUser.newPassword !== null) {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;

      const uppercasePassword = uppercaseRegExp.test(currentUser.newPassword);
      const lowercasePassword = lowercaseRegExp.test(currentUser.newPassword);
      const digitsPassword = digitsRegExp.test(currentUser.newPassword);
      const specialCharPassword = specialCharRegExp.test(currentUser.newPassword);
      const minLengthPassword = minLengthRegExp.test(currentUser.newPassword);

      let errMsg = "";

      if (!uppercasePassword) {
        errMsg = "Password must contain at least one uppercase!";
      } else if (!lowercasePassword) {
        errMsg = "Password must contain at least one lowercase";
      } else if (!digitsPassword) {
        errMsg = "Password must contain at least one digit";
      } else if (!specialCharPassword) {
        errMsg = "Password must contain at least one Special Character";
      } else if (!minLengthPassword) {
        errMsg = "Password must contain a minimum of 8 characters";
      } else {
        errMsg = "";
      }

      setPasswordErr(errMsg);

      if (currentUser.newPassword !== currentUser.confirmPassword) {
        setCnfPasswordErr("Confirm password doesn't match");
        errorCount++;
      } else {
        setCnfPasswordErr("");
      }

      if (errMsg !== "") {
        errorCount++;
      } else {
        formData.append("newPassword", currentUser.newPassword);
      }
    }

    if (currentUser.confirmPassword === "") {
      setCnfPasswordErr("Confirm password is required");
      errorCount++;
    }

    if (passwordErr !== "") {
      errorCount++;
    }

    if (errorCount === 0) {
      // Perform the update profile action here
      toast.success("Profile updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        transition: Slide,
      });

      navigate("/account/list");
    } else {
      toast.error("Please fill the required fields correctly!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  return (
    <>
      <Card className={styles.profileInfoCard}>
        <Form className={styles.profileForm} onSubmit={submitHandler}>
          <CardBody>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>First Name *</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={currentUser.firstName || ""}
                    invalid={firstNameErr !== ""}
                    onChange={handleInputChange}
                    onBlur={handleValidation}
                    required
                  />
                  <FormFeedback>{firstNameErr}</FormFeedback>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={currentUser.lastName || ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={currentUser.email || ""}
                    invalid={emailErr !== ""}
                    onChange={handleInputChange}
                    onBlur={handleValidation}
                    required
                  />
                  <FormFeedback>{emailErr}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={currentUser.phoneNumber || ""}
                    invalid={phoneNumberErr !== ""}
                    onChange={handleInputChange}
                    onBlur={handleValidation}
                  />
                  <FormFeedback>{phoneNumberErr}</FormFeedback>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Address Line 1</Label>
                  <Input
                    type="text"
                    name="addressOne"
                    value={currentUser.addressOne || ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Address Line 2</Label>
                  <Input
                    type="text"
                    name="addressTwo"
                    value={currentUser.addressTwo || ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Country</Label>
                  <Input
                    type="select"
                    name="countryId"
                    value={currentUser.countryId || 226} // Default country ID set to 226
                    onChange={handleInputChange}
                  >
                    <option value={226}>United States</option>
                    <option value={38}>Canada</option>
                    {/* Add more countries as needed */}
                  </Input>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>State</Label>
                  <Input
                    type="select"
                    name="stateCode"
                    value={currentUser.stateCode || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    {/* Add more states as needed */}
                  </Input>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={currentUser.city || ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Zip Code</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={currentUser.zipCode || ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={currentUser.newPassword || ""}
                    invalid={passwordErr !== ""}
                    onChange={handleInputChange}
                    onBlur={handleValidation}
                  />
                  <FormFeedback>{passwordErr}</FormFeedback>
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={currentUser.confirmPassword || ""}
                    invalid={cnfPasswordErr !== ""}
                    onChange={handleInputChange}
                    onBlur={handleValidation}
                  />
                  <FormFeedback>{cnfPasswordErr}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Public Bio</Label>
                  <Input
                    type="textarea"
                    name="publicBio"
                    value={currentUser.publicBio || ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>Profile Image</Label>
                  <Input
                    type="file"
                    name="profileImage"
                    onChange={handleFileInput}
                  />
                  <FormFeedback>{profileImgErr}</FormFeedback>
                  {profileImgPreview && (
                    <div>
                      <img
                        src={profileImgPreview}
                        alt="Profile Preview"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <button onClick={removeProfilePicture}>
                        Remove Profile Picture
                      </button>
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Button type="submit" color="primary">
              Save
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </>
  );
};

export default ProfileInformation;
