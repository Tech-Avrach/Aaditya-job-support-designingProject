import React, { useMemo, useState } from 'react';
import { Container, Row, Col, Input, Button, CardBody, Table } from 'reactstrap';
import ModalComponent from './ModalComponent'
import { useTable } from 'react-table';
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoEllipsisHorizontalCircleOutline, IoDocumentOutline } from 'react-icons/io5';

// import IconContainer from './IconContainer'; // Assuming IconContainer is a custom component

const years = Array.from({ length: 30 }, (_, index) => ({
    value: 2000 + index,
    label: 2000 + index,
  }));

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ].map((month, index) => ({ value: month, label: month }));

const dummyData = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    type: `Account transcript ${index + 1}`,
    from: years[index % years.length].value,
    to: years[(index + 1) % years.length].value,
    fiscalEnd: months[index % months.length].value,
  }));


  const getStatusIcon = (status) => {
    switch (status) {
        case 'success':
            return <IoCheckmarkCircleOutline style={{ color: 'green' }} />;
        case 'error':
            return <IoCloseCircleOutline style={{ color: 'red' }} />;
        case 'pending':
            return <IoEllipsisHorizontalCircleOutline style={{ color: 'orange' }} />;
        default:
            return null;
    }
};

const AddTranscripts = () => {

const data = useMemo(() => [
    { year: 2013, type: 'Account Transcript - 1040', status: 'error', message: 'CAF check failed - No POA for this transcript', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2014, type: 'Account Transcript - 1040', status: 'error', message: 'CAF check failed - No POA for this transcript', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2015, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2016, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2017, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2018, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2019, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2020, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2021, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2022, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2023, type: 'Account Transcript - 1040', status: 'success', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' },
    { year: 2024, type: 'Account Transcript - 1040', status: 'pending', message: 'From TDS', lastCheck: 'Jun 12 2024 8:54am', date: '06/12/2024' }
], []);

const columns = useMemo(() => [
    {
        Header: '',
        accessor: 'checkbox',
        Cell: ({ row }) => (
            <Input type="checkbox" />
        )
    },
    {
        Header: 'Year',
        accessor: 'year'
    },
    {
        Header: 'Type',
        accessor: 'type'
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => {
            switch (value) {
                case 'success':
                    return <IoCheckmarkCircleOutline fontSize={"25px"} style={{ color: 'green' }} />;
                case 'error':
                    return <IoCloseCircleOutline fontSize={"25px"} style={{ color: 'red' }} />;
                case 'pending':
                    return <IoEllipsisHorizontalCircleOutline fontSize={"25px"} style={{ color: 'orange' }} />;
                default:
                    return null;
            }
        }
    },
    {
        Header: 'Message',
        accessor: 'message'
    },
    {
        Header: 'Last Check',
        accessor: 'lastCheck'
    },
    {
        Header: 'Date',
        accessor: 'date'
    },
    {
        Header: 'Transcript',
        accessor: 'transcript',
        Cell: () => (
            <IoDocumentOutline />
        )
    }
], []);

const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
} = useTable({ columns, data });

    const [open, setOpen] = useState(false)
  return (
    <Container fluid>
      <Button onClick={() => setOpen(true)}>
        Add Transcripts
      </Button>
      <ModalComponent
        isOpen={open}
        toggleModal={() => setOpen(!open)}
        data={dummyData}
        columns={columns}
        // years={}
        // months={}
      />
            <Row>
                <Col md="12">
                    <CardBody>
                        <Table {...getTableProps()} bordered>
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </CardBody>
                </Col>
            </Row>
    </Container>
  )
}

export default AddTranscripts
