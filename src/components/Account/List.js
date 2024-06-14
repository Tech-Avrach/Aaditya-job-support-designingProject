import React, { useState, useEffect, useMemo, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, CardBody, Input } from "reactstrap";

import DataTable from "react-data-table-component";

import * as Ionicons from "react-icons/io";

import { toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

//import common page container
import PageContainer from "../Layout/PageContainer";

//import users action
import {
  retrieveUsers,
  updateUserStatus,
  deleteUser,
  restoreUser,
} from "../../redux/actions/users";

//import common filter component
import FilterComponent from "../../helpers/FilterComponent";

import debounceFunction from "../../helpers/Debounce";

import IconContainer from "../Common/IconContainer";

const EditIcon = Ionicons["IoIosCreate"];

const DeleteIcon = Ionicons["IoIosTrash"];

const RestoreIcon = Ionicons["IoIosRefresh"];

toast.configure();

const List = (props) => {
  const navigate = useNavigate();

  const currentUser = props.currentUser;

  useEffect(() => {
    if (currentUser.roleId === 2) {
      navigate("/account/list");
    }
  }, [currentUser, navigate]);

  const dispatch = useDispatch();

  const { users: filteredUsers, totalUserCount: totalUsers } = useSelector(
    (state) => state.users
  );

  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    //dispatch to fetch users with role Id = 1 (admins)
    dispatch(
      retrieveUsers(1, filterText, 1, perPage, currentUser.id, true, true)
    );
  }, []);

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const debounceSearch = useCallback(
    debounceFunction(
      (nextValue) =>
        dispatch(
          retrieveUsers(1, nextValue, 1, perPage, currentUser.id, true, true)
        ),
      1000
    ),

    []
  );

  //subheader component of react-data-table
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);

        setFilterText("");

        //dispatch to fetch users with role Id = 1 (admins)
        dispatch(retrieveUsers(1, "", 1, perPage, currentUser.id, true, true));
      }
    };

    return (
      <FilterComponent
        onFilter={(event) => {
          setFilterText(event.target.value);
          debounceSearch(event.target.value);
        }}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleEditClick = (row) => navigate(`/user/admin/${row.id}`);

  //status handler
  const handleStatusChange = (e, id, status) => {
    e.preventDefault();

    const data = {
      roleId: "1",
      isActive: status,
      keyword: filterText,
      page: currentPage,
      perPage,
      excludeId: currentUser.id,
      all: true,
      active: true,
    };

    let message = "";

    if (status === "0") {
      message = "Admin deactivated successfully!";
    } else if (status === "1") {
      message = "Admin activated successfully!";
    } else {
      message = "Admin suspended successfully!";
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
        toast(error.response.data.message, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
      });
  };

  //delete/restore handler
  const handleDelete = (e, id, action) => {
    e.preventDefault();

    const data = {
      roleId: "1",
      keyword: filterText,
      page: currentPage,
      perPage,
      excludeId: currentUser.id,
      all: true,
      active: true,
    };

    if (action === "delete") {
      //dispatch to delete the user
      dispatch(deleteUser(id, data))
        .then((response) => {
          toast("Admin deleted successfully!", {
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
          toast("Admin restored successfully!", {
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

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => {
          return row.lastName !== null && row.lastName !== ""
            ? row.firstName + " " + row.lastName
            : row.firstName;
        },
        sortable: true,
        headerStyle: (selector, id) => {
          return { textAlign: "center" };
        },
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        headerStyle: (selector, id) => {
          return { textAlign: "center" };
        },
      },
      {
        name: "Phone Number",
        selector: (row) => row.phoneNumber,
        sortable: true,
        headerStyle: (selector, id) => {
          return { textAlign: "center" };
        },
      },
      {
        name: "Actions",
        button: true,
        minWidth: "218px",
        headerStyle: (selector, id) => {
          return { textAlign: "center" };
        },
        cell: (row) => (
          <>
            <DeleteIcon id="delete-icon" style={{ display: "none" }} />
            <RestoreIcon id="restore-icon" style={{ display: "none" }} />

            {row.deletedAt === null && (
              <IconContainer
                Icon={EditIcon}
                handleOnClick={() => handleEditClick(row)}
                text="Edit"
              />
            )}
            <IconContainer
              id={row.deletedAt === null ? "delete-icon" : "restore-icon"}
              Icon={row.deletedAt === null ? DeleteIcon : RestoreIcon}
              handleOnClick={(e) =>
                row.deletedAt === null
                  ? handleDelete(e, row.id, "delete")
                  : handleDelete(e, row.id, "restore")
              }
              text={row.deletedAt === null ? "Delete" : "Restore"}
              iconColor={row.deletedAt === null ? "#d92550" : "#3ac47d"}
            />
            {row.deletedAt === null && (
              <Input
                type="select"
                defaultValue={row.isActive}
                id="isActive"
                name="isActive"
                onChange={(e) => handleStatusChange(e, row.id, e.target.value)}
                style={{ marginLeft: "10px", width: "50%" }}
              >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
                <option value="2">Suspend</option>
              </Input>
            )}
          </>
        ),
      },
    ],
    [handleStatusChange]
  );

  const handlePageChange = (page) => {
    //dispatch to fetch users with role Id = 1 (admins)
    dispatch(
      retrieveUsers(1, filterText, page, perPage, currentUser.id, true, true)
    );

    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    //dispatch to fetch users with role Id = 1 (admins)
    dispatch(
      retrieveUsers(1, filterText, page, newPerPage, currentUser.id, true, true)
    );

    setPerPage(newPerPage);
  };

  return (
    <PageContainer
      pageTitleIcon="pe-7s-user icon-gradient bg-plum-plate"
      pageHeading="Admins"
      pageSubTitle="Listing administrator accounts on the system"
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <DataTable
                columns={columns}
                data={filteredUsers}
                pagination
                // paginationPerPage = '25'
                paginationServer
                paginationTotalRows={totalUsers}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                subHeader
                subHeaderComponent={subHeaderComponent}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default List;
