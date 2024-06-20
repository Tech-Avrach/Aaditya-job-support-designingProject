import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';

const DataTableComponent = ({ columns, handleRowSelected, subHeaderComponent, subHeader }) => {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const { users } = useSelector(state => state.account)

  // const { users : filteredUsers, totalUserCount : totalUsers } = useSelector((state) => state.users);

  const handleChange = ({ selectedRows }) => {
    // selectedRows creates checkbox & handels row selection.
    setSelectedRows(selectedRows);
    handleRowSelected(selectedRows);
  };

  const handlePageChange = (page) => {
    // dispatch(retrieveUsers(3, filterText, page, perPage, currentUser.id, 1, true, true));
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // dispatch(retrieveUsers(3, filterText, page, newPerPage, currentUser.id, 1, true, true));
    setPerPage(newPerPage);
  };

  return (
    <DataTable
      columns={columns}
      data={users}
      selectableRows
      // onSelectedRowsChange={handleChange}
      pagination
      paginationServer
      // paginationTotalRows={totalUsers}
      paginationDefaultPage={currentPage}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      subHeader={subHeader}
      subHeaderComponent={subHeaderComponent}
    />
  );
};

export default DataTableComponent;
