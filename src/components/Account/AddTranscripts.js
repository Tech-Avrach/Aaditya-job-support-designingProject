import React, { useState, useMemo } from "react";
import { Container, Row, Col, Button, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import {
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoEllipsisHorizontalCircleOutline,
    IoDocumentOutline,
} from "react-icons/io5";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
 import ModalComponent from "./ModalComponent";

 import './AddTranscripts.scss'
 ; // Assuming you have a corresponding CSS file

const getStatusIcon = (status) => {
    switch (status) {
        case "success":
            return <IoCheckmarkCircleOutline className="status-icon success" />;
        case "error":
            return <IoCloseCircleOutline className="status-icon error" />;
        case "pending":
            return <IoEllipsisHorizontalCircleOutline className="status-icon pending" />;
        default:
            return null;
    }
};

const AddTranscripts = () => {
    const [userDetail] = useOutletContext() || [];
    const [open, setOpen] = useState(false);

    const data = useMemo(
        () => [
            {
                id: 1,
                year: 2013,
                type: "Account Transcript - 1040",
                status: "error",
                message: "CAF check failed - No POA for this transcript",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 2,
                year: 2014,
                type: "Account Transcript - 1040",
                status: "error",
                message: "CAF check failed - No POA for this transcript",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 3,
                year: 2015,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 4,
                year: 2016,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 5,
                year: 2017,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 6,
                year: 2018,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 7,
                year: 2019,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 8,
                year: 2020,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 9,
                year: 2021,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 10,
                year: 2022,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 11,
                year: 2023,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                id: 12,
                year: 2024,
                type: "Account Transcript - 1040",
                status: "pending",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
        ],
        []
    );

    const columns = useMemo(
        () => [
            {
                name: "Year",
                selector: row => row.year,
                sortable: true,
                width: "100px", // Adjusted width for Year column
            },
            {
                name: "Type",
                selector: row => row.type,
                sortable: true,
                grow: 2, // Increased width for Type column
            },
            {
                name: "Status",
                selector: row => row.status,
                cell: row => getStatusIcon(row.status),
                sortable: true,
            },
            {
                name: "Message",
                selector: row => row.message,
                sortable: true,
            },
            {
                name: "Last Check",
                selector: row => row.lastCheck,
                sortable: true,
            },
            {
                name: "Date",
                selector: row => row.date,
                sortable: true,
            },
            {
                name: "Transcript",
                cell: row => (
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip id="tooltip-top">Download</Tooltip>}
                    >
                        <span className="transcript-icon">
                            <IoDocumentOutline size={20} /> {/* Reduced size of icon */}
                        </span>
                    </OverlayTrigger>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
        ],
        []
    );

    const customStyles = {
        headCells: {
            style: {
                border: 'none',
                backgroundColor: 'transparent', // Removing background color
            },
        },
        cells: {
            style: {
                border: 'none',
                backgroundColor: 'transparent', // Removing background color
            },
        },
        rows: {
            style: {
                border: 'none',
                backgroundColor: 'transparent', // Removing background color
            },
        },
        table: {
            style: {
                border: 'none',
                backgroundColor: 'transparent', // Removing background color
            },
        },
        rowsEven: {
            style: {
                backgroundColor: 'transparent', // Removing background color for even rows
            },
        },
        rowsOdd: {
            style: {
                backgroundColor: 'transparent', // Removing background color for odd rows
            },
        },
    };

    return (
        <Container fluid>
            <Button color="primary" onClick={() => setOpen(true)} className="me-2">Add Transcripts</Button>
            <Button color="primary" className="me-2">
                Download Transcripts
            </Button>
            <ModalComponent
                isOpen={open}
                toggleModal={() => setOpen(!open)}
                userDetail={userDetail}
            />
            <Row>
                <Col md="12">
                    <CardBody>
                        <DataTable
                            columns={columns}
                            data={data}
                            selectableRows
                            pagination={false} // Hide pagination
                            customStyles={customStyles}
                        />
                    </CardBody>
                </Col>
            </Row>
        </Container>
    );
};

export default AddTranscripts;
