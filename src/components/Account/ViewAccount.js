import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import "./table.scss";
import {
  createAccount,
  updateUser,
  updateUserType,
} from "../../redux/actions/account";
import taxProService from "../../redux/services/taxpro.service";
import IconContainer from "../Common/IconContainer";
import * as Ionicons from "react-icons/io";

const EditIcon = Ionicons["IoIosCreate"];
const ViewAccount = ({ hanldeViewPage, userDetail, taxProList }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState({ type: "0" });
  useEffect(() => {
    if (userDetail !== undefined && id) {
      setCurrentUser({ ...userDetail, federalTaxId: userDetail.taxId });
    }
  }, [userDetail]);

  return (
    <Row>
      <Col md={{ size: 1, offset: 11 }}>
        <IconContainer
          id="edit-icon"
          fontSize={"25px"}
          Icon={EditIcon}
          handleOnClick={() => {
            hanldeViewPage();
          }}
          text="Edit"
        />
      </Col>
      <Col md="12">
        <Card className="main-card mb-3">
          <Form>
            <CardBody>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="type">
                      Account Type
                    </Label>
                    <Input
                      type="text"
                      name="type"
                      id="type"
                      value={currentUser.type ? "Business" : "Individual"}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  {currentUser?.type != "1" ? (
                    <FormGroup>
                      <Label className="fw-bold" for="taxId">
                        Tax Id
                      </Label>
                      <Input
                        type="text"
                        name="taxId"
                        id="taxId"
                        placeholder="Tax Id..."
                        value={currentUser ? currentUser.taxId : ""}
                        readOnly
                        plaintext
                        className="form-control-plaintext no-select"
                      />
                    </FormGroup>
                  ) : (
                    <FormGroup>
                      <Label className="fw-bold" for="federalTaxId">
                        Federal Tax Id
                      </Label>
                      <Input
                        type="text"
                        name="federalTaxId"
                        id="federalTaxId"
                        placeholder="Federal Tax Id..."
                        value={currentUser ? currentUser.federalTaxId : ""}
                        readOnly
                        plaintext
                        className="form-control-plaintext no-select"
                      />
                    </FormGroup>
                  )}
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="taxProId">
                      Tax Pro
                    </Label>
                    <Input
                      type="select"
                      name="taxProId"
                      id="taxProId"
                      value={
                        taxProList?.find(
                          (item) => item.id === currentUser.taxProId
                        )?.name
                      }
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="cafNumber">
                      CAF Number
                    </Label>
                    <Input
                      type="text"
                      name="cafNumber"
                      id="cafNumber"
                      placeholder="CAF Number..."
                      value={currentUser?.TaxPro?.cafNumber}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>
                {currentUser?.type == 1 && (
                  <>
                    <Col md="4">
                      <FormGroup>
                        <Label className="fw-bold" for="legalBusinessName">
                          Legal Business Name
                        </Label>
                        <Input
                          type="text"
                          name="legalBusinessName"
                          id="legalBusinessName"
                          placeholder="Legal Business here..."
                          value={currentUser.legalBusinessName || "N/A"}
                          readOnly
                          plaintext
                          className="form-control-plaintext no-select"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label className="fw-bold" for="dbaName">
                          DBA Name
                        </Label>
                        <Input
                          type="text"
                          name="dbaName"
                          id="dbaName"
                          placeholder="DBA Name here..."
                          value={currentUser.dbaName || "N/A"}
                          readOnly
                          plaintext
                          className="form-control-plaintext no-select"
                        />
                      </FormGroup>
                    </Col>
                  </>
                )}
                {currentUser?.type == 0 && (
                  <>
                    <Col md="4">
                      <FormGroup>
                        <Label className="fw-bold" for="firstName">
                          First Name
                        </Label>
                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name here..."
                          value={currentUser.firstName || "N/A"}
                          readOnly
                          plaintext
                          className="form-control-plaintext no-select"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label className="fw-bold" for="middleInitial">
                          Middle Initial
                        </Label>
                        <Input
                          type="text"
                          name="middleInitial"
                          id="middleInitial"
                          placeholder="Middle Initial here..."
                          value={currentUser.middleInitial || "N/A"}
                          readOnly
                          plaintext
                          className="form-control-plaintext no-select"
                        />
                      </FormGroup>
                    </Col>
                  </>
                )}
                {currentUser?.type == 0 && (
                  <>
                    <Col md="4">
                      <FormGroup>
                        <Label className="fw-bold" for="lastName">
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name here..."
                          value={currentUser.lastName || "N/A"}
                          readOnly
                          plaintext
                          className="form-control-plaintext no-select"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label className="fw-bold" for="addressOne">
                          Date of Birth
                        </Label>
                        <input
                          type="date"
                          value={currentUser.dob || "N/A"}
                          max={new Date().toISOString().split("T")[0]}
                          readOnly
                          plaintext
                          className="form-control-plaintext no-select"
                        ></input>
                      </FormGroup>
                    </Col>
                  </>
                )}
                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="email">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email address here..."
                      value={currentUser.email || "N/A"}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Phone Number here..."
                      value={currentUser.phoneNumber || "N/A"}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="address1">
                      {" "}
                      Address 1
                    </Label>
                    <Input
                      type="text"
                      name="address1"
                      id="address1"
                      placeholder="Address..."
                      value={currentUser.address1 || "N/A"}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="address2">
                      Address 2
                    </Label>
                    <Input
                      type="text"
                      name="address2"
                      id="address2"
                      placeholder="Address..."
                      value={currentUser.address2 || "N/A"}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="city">
                      City
                    </Label>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City here..."
                      value={currentUser.city || "N/A"}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="state">
                      State
                    </Label>
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State here..."
                      value={currentUser.state || "N/A"}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label className="fw-bold" for="zipCode">
                      Zip Code
                    </Label>
                    <Input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      placeholder="Zip code here..."
                      value={currentUser.zipCode || "N/A"}
                      readOnly
                      plaintext
                      className="form-control-plaintext no-select"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default ViewAccount;
