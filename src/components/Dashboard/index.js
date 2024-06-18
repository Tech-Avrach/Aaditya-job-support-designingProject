import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Container,
  CardBody,
  Input,
  Button,
  Label,
} from "reactstrap";
import PageContainer from "../Layout/PageContainer";
import DataTable from "react-data-table-component";
import FilterComponent from "../../helpers/FilterComponent";
import debounceFunction from "../../helpers/Debounce";
import * as Ionicons from "react-icons/io";
import IconContainer from "../Common/IconContainer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveUsers,
  updateUserStatus,
  deleteUser,
  restoreUser,
  updateEmailStatus,
} from "../../redux/actions/account";
import { toast, Slide } from "react-toastify";
import DeleteConfirmationModal from "../Common/DeleteModal";

toast.configure();

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users: filteredData, totalUserCount } = useSelector(
    (state) => state.account
  );
  const [statusFilter, setStatusFilter] = useState({ active: "1,0" });
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(
    process.env.REACT_APP_API_PAGINATION_LIMIT
  );
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const handleFilterChange = (e) => {
    const newValue = e.target.value;
    setStatusFilter((prevStatus) => ({
      ...prevStatus,
      active: newValue,
    }));
  };

  const ActiveIcon = Ionicons["IoIosCheckmarkCircleOutline"];
  const InactiveIcon = Ionicons["IoIosCloseCircle"];

  const EditIcon = Ionicons["IoIosCreate"];

  const RestoreIcon = Ionicons["IoIosRefresh"];

  const DeleteIcon = Ionicons["IoIosTrash"];

  const EnableNotification = Ionicons["IoIosMailOpen"];

  const DisableNotification = Ionicons["IoIosMail"];

  const handleEditClick = (row) => navigate(`/account/${row.publicId}`);

  //status handler
  const handleStatusChange = (e, id, status) => {
    e.preventDefault();
    let data = {
      status: status,
      keyword: filterText,
      page: currentPage,
      perPage,
      all: true,
      active: statusFilter.active,
    };

    let message = "";

    if (status === 0) {
      message = "Account deactivated successfully!";
    } else if (status === 1) {
      message = "Account activated successfully!";
    }
    //dispatch to update the status of the user
    dispatch(updateUserStatus(id, data))
      .then((response) => {
        toast(message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "success", // info/success/warning/error
        });
      })
      .catch((error) => {
        toast(error?.response?.data.message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "error",
        });
      });
  };

  //  Email handler
  const handleEmailNotificationChange = (e, id, status) => {
    e.preventDefault();
    let data = {
      isEmailEnabled: status,
      keyword: filterText,
      page: currentPage,
      perPage,
      all: true,
      active: statusFilter.active,
    };

    let message = "";

    if (status === "0") {
      message = "Email Disabled successfully!";
    } else if (status === "1") {
      message = "Email Enabled successfully!";
    }
    //dispatch to update the status of the user
    dispatch(updateEmailStatus(id, data))
      .then((response) => {
        toast(message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "success", // info/success/warning/error
        });
      })
      .catch((error) => {
        toast(error?.response?.data.message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "error",
        });
      });
  };

  const handleDelete = (e, id, action) => {
    e.preventDefault();
    let data = {
      keyword: filterText,
      page: currentPage,
      perPage,
      all: true,
      active: statusFilter.active,
    };

    if (action === "delete") {
      //dispatch to delete the user
      dispatch(deleteUser(id, data))
        .then((response) => {
          toast("Account deleted successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
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
    } else {
      //dispatch to restore the user
      dispatch(restoreUser(id, data))
        .then((response) => {
          toast("Account restored successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
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
  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(retrieveUsers(true, filterText, 1, perPage, statusFilter.active));
    setPerPage(newPerPage);
  };
  const handleAddAccount = () => {
    navigate("/account/add");
  };
  const handlePageChange = (page) => {
    dispatch(retrieveUsers(true, filterText, 1, perPage, statusFilter.active));

    setCurrentPage(page);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleDeleteConfirm = (e, id, action) => {
    // Perform the delete action here
    console.log("Item deleted");
    handleDelete(e, id, action);
    setModalOpen(false); // Close the modal after deletion
  };

  const columns = useMemo(
    () => [
      {
        name: "Status",
        selector: (row) => (row?.status == 1 ? "Active" : "Inactive"),
        sortable: true,
        width: "100px",
      },
      {
        name: "Account Type",
        selector: (row) => (row?.type === 0 ? "Individual" : "Business"),
        sortable: true,
        width: "150px",
      },
      {
        name: "Account Name",
        selector: (row) =>
          row?.type === 0 ? (
            <span
              className="text-primary cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => handleEditClick(row)}
            >
              {row?.firstName || ""}
              {row?.middleInitial ? row.middleInitial + " " : " "}
              {row?.lastName.trim() || ""}
            </span>
          ) : (
            <span
              className="text-primary cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => handleEditClick(row)}
            >
              {row.legalBusinessName}
            </span>
          ),
        sortable: true,
        width: "150px",
      },
      {
        name: "Tax ID",
        selector: (row) => (row?.type === 0 ? row?.taxId : row.taxId),
        sortable: true,
      },
      {
        name: "CAF Status",
        selector: (row) => (row.cafStatus === 0 ? "Failed" : "Passed"),
        sortable: true,
        width: "130px",
      },
      {
        name: "Account Change",
        selector: (row) => row.accountChange,
        sortable: true,
        width: "150px",
      },
      {
        name: "Tax Pro",
        selector: (row) => row?.TaxPro?.name,
        sortable: true,
        width: "130px",
      },
      {
        name: "Last Updated",
        selector: (row) =>
          row.lastUpdated
            ? new Date(row.lastUpdated).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "",
        sortable: true,
        width: "150px",
      },
      {
        name: "Notification Sent to",
        selector: (row) => row.notificationsSentTo,
        sortable: true,
        width: "200px",
      },
      {
        name: "Actions",
        button: true,
        // width: "218px",
        minWidth: "250px",
        headerStyle: (selector, id) => {
          return { textAlign: "center" };
        },
        cell: (row) =>
          row.deletedAt === null ? (
            <>
              {/* <IconContainer
                Icon={EditIcon}
                handleOnClick={() => handleEditClick(row)}
                text={"Edit Account"}
              /> */}

              <IconContainer
                id={row.status ? "deactivate-icon" : "active-icon"}
                Icon={row.status ? ActiveIcon : InactiveIcon}
                handleOnClick={(e) =>
                  row.status
                    ? handleStatusChange(e, row.id, 0)
                    : handleStatusChange(e, row.id, 1)
                }
                text={row.status ? "Deactivate" : "Activate"}
                iconColor={row.status ? "#3ac47d" : "#d92550"}
              />
              <IconContainer
                id={row.isEmailEnabled ? "disable-icon" : "enable-icon"}
                Icon={
                  row.isEmailEnabled ? EnableNotification : DisableNotification
                }
                handleOnClick={(e) =>
                  row.isEmailEnabled
                    ? handleEmailNotificationChange(e, row.id, "0")
                    : handleEmailNotificationChange(e, row.id, "1")
                }
                text={
                  row.isEmailEnabled
                    ? "Disable Email Notification"
                    : "Enable Email Notification"
                }
                iconColor={row.isEmailEnabled ? "#3ac47d" : "#d92550"}
              />
              <IconContainer
                id={"delete-icon"}
                Icon={DeleteIcon}
                handleOnClick={(e) => toggleModal()}
                text={"Delete"}
                iconColor={"#d92550"}
              />
              <DeleteConfirmationModal
                isOpen={modalOpen}
                toggle={toggleModal}
                onConfirm={(e) => handleDeleteConfirm(e, row.id, "delete")}
              />
            </>
          ) : (
            <IconContainer
              id={"restore-icon"}
              Icon={RestoreIcon}
              handleOnClick={(e) => handleDelete(e, row.id, "restore")}
              text={"Restore"}
              iconColor={"#3ac47d"}
            />
          ),
      },
    ],
    [handleStatusChange, handleEmailNotificationChange, handleDelete]
  );

  useEffect(() => {
    dispatch(retrieveUsers(true, filterText, 1, perPage, statusFilter.active));
  }, [statusFilter]);

  // Search
  const debounceSearch = useCallback(
    debounceFunction((nextValue) => {
      dispatch(retrieveUsers(true, nextValue, 1, perPage, statusFilter.active));
    }, 1000),
    []
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        dispatch(
          retrieveUsers(true, filterText, 1, perPage, statusFilter.active)
        );
      }
    };

    return (
      <FilterComponent
        width="100%"
        onFilter={(event) => {
          setFilterText(event.target.value);
          debounceSearch(event.target.value);
        }}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, debounceSearch, dispatch]);

  return (
    <PageContainer
      pageTitleIcon="pe-7s-graph icon-gradient bg-plum-plate"
      pageHeading="Accounts"
      pageSubTitle="Listing all the accounts in the system"
    >
      <Container fluid>
        <Row
          className="align-items-center mb-3 justify-content-between"
          style={{ width: "100%", margin: "auto" }}
        >
          {/* <Input
              type="select"
              value={statusFilter.active}
              onChange={handleFilterChange}
            >
              <option value="1,0">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Input> */}
          {/* <Col md="2">
             <Input
                name="selectAll"
                type="checkbox"
                // checked={checkboxStates[groupKey]}
                checked
                // onChange={() => handleCheckboxChange(groupKey)}
          />
            <Label className="ms-3">Select All</Label>
          </Col> */}
    
          <Col md="4" className="d-flex gap-2 ">
            <Button size="lg" color="primary" onClick={handleAddAccount}>
              Add Account
            </Button>
            <Button size="lg" color="primary" onClick={handleAddAccount}>
             Get Transcipts
            </Button>
          </Col>
          <Col md="4">
          {subHeaderComponent}
          </Col>
        </Row>
        <Row className="align-items-center mb-3">
          <Col md="12">
            <CardBody>
              <DataTable
                columns={columns}
                data={filteredData}
                selectableRows
                // onSelectedRowsChange={handleChange}
                // pagination
                paginationServer
                // paginationTotalRows={totalUsers}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                subHeaderComponent={subHeaderComponent}
              />
            </CardBody>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
}

export default Dashboard;