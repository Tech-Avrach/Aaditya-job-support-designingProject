import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { retrieveUsers } from "../../redux/actions/account";
import FilterComponent from "../../helpers/FilterComponent";
import { useDispatch, useSelector } from "react-redux";
import debounceFunction from "../../helpers/Debounce";
import { Row, Col, Card, CardBody, Input } from "reactstrap";
import DataTable from "react-data-table-component";
import * as Ionicons from "react-icons/io";
import { toast, Slide } from "react-toastify";
import {
  taxProlist,
  deleteTaxPro,
  restoreTaxPro,
} from "../../redux/actions/taxpro";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../Layout/PageContainer";
import IconContainer from "../Common/IconContainer";

const EditIcon = Ionicons["IoIosCreate"];
const DeleteIcon = Ionicons["IoIosTrash"];
const RestoreIcon = Ionicons["IoIosRefresh"];

toast.configure();

const ListtaxPro = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taxproUser, taxproUserCount } = useSelector((state) => state.taxpro);

  useEffect(() => {
    dispatch(taxProlist());
  }, [dispatch]);

  const currentUser = props.currentUser;

  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const handleEditClick = (row) => navigate(`/taxpros/${row.publicId}`);

  // Dummy handle functions remove it later
  const handleStatusChange = (e, id, status) => {};
  //delete/restore handler
  const handleDelete = (e, id, action) => {
    e.preventDefault();

    const data = {
      keyword: filterText,
      page: currentPage,
      perPage,
      all: true,
      active: true,
    };

    if (action === "delete") {
      //dispatch to delete the user
      dispatch(deleteTaxPro(id, data))
        .then((response) => {
          toast("Tax Pro deleted successfully!", {
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
      dispatch(restoreTaxPro(id))
        .then((response) => {
          toast("Tax Pro restored successfully!", {
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
    dispatch(retrieveUsers(filterText, page, newPerPage));

    setPerPage(newPerPage);
  };
  const handlePageChange = (page) => {
    dispatch(retrieveUsers(filterText, page, perPage));

    setCurrentPage(page);
  };
  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        headerStyle: () => {
          return { textAlign: "center" };
        },
      },
      {
        name: "CAF Number",
        selector: (row) => row.cafNumber,
        sortable: true,
        headerStyle: () => {
          return { textAlign: "center" };
        },
      },
      {
        name: "Actions",
        button: true,
        minWidth: "218px",
        headerStyle: () => {
          return { textAlign: "center" };
        },
        cell: (row) => (
          <>
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
          </>
        ),
      },
    ],
    [handleStatusChange]
  );

  const debounceSearch = useCallback(
    debounceFunction((nextValue) => {
      dispatch(taxProlist(nextValue, 1));
    }, 1000),
    [dispatch]
  );

  const [statusFilter, setStatusFilter] = useState("All");

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        dispatch(taxProlist(filterText, 1));
      }
    };

    return (
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <FilterComponent
          onFilter={(event) => {
            setFilterText(event.target.value);
            debounceSearch(event.target.value);
          }}
          onClear={handleClear}
          filterText={filterText}
        />
      </div>
    );
  }, [filterText, debounceSearch, dispatch]);

  return (
    <PageContainer
      pageTitleIcon="pe-7s-user icon-gradient bg-plum-plate"
      pageHeading="Tax Pro"
      pageSubTitle="Listing tax pros"
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <DataTable
                columns={columns}
                data={taxproUser}
                pagination
                paginationServer
                paginationTotalRows={taxproUserCount}
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

export default ListtaxPro;
