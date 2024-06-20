import React, { useMemo, useState } from "react";
import {
    Container,
    Row,
    Col,
    Input,
    Button,
    CardBody,
    Table,
    Label,
    FormGroup,
} from "reactstrap";
import ModalComponent from "./ModalComponent";
import { useTable } from "react-table";
import {
    IoCheckmarkCircleOutline,
    IoCloseCircleOutline,
    IoEllipsisHorizontalCircleOutline,
    IoDocumentOutline,
    IoRadioButtonOffSharp,
} from "react-icons/io5";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

// import IconContainer from './IconContainer'; // Assuming IconContainer is a custom component

const getStatusIcon = (status) => {
    switch (status) {
        case "success":
            return <IoCheckmarkCircleOutline style={{ color: "green" }} />;
        case "error":
            return <IoCloseCircleOutline style={{ color: "red" }} />;
        case "pending":
            return <IoEllipsisHorizontalCircleOutline style={{ color: "orange" }} />;
        default:
            return null;
    }
};

const AddTranscripts = () => {
    const [userDetail] = useOutletContext();

    const data = useMemo(
        () => [
            {
                year: 2013,
                type: "Account Transcript - 1040",
                status: "error",
                message: "CAF check failed - No POA for this transcript",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2014,
                type: "Account Transcript - 1040",
                status: "error",
                message: "CAF check failed - No POA for this transcript",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2015,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2016,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2017,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2018,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2019,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2020,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2021,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2022,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
                year: 2023,
                type: "Account Transcript - 1040",
                status: "success",
                message: "From TDS",
                lastCheck: "Jun 12 2024 8:54am",
                date: "06/12/2024",
            },
            {
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
                Header: "",
                accessor: "checkbox",
                Cell: ({ row }) => <Input type="checkbox" />,
            },
            {
                Header: "Year",
                accessor: "year",
            },
            {
                Header: "Type",
                accessor: "type",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => {
                    switch (value) {
                        case "success":
                            return (
                                <IoCheckmarkCircleOutline
                                    fontSize={"25px"}
                                    style={{ color: "green" }}
                                />
                            );
                        case "error":
                            return (
                                <IoCloseCircleOutline
                                    fontSize={"25px"}
                                    style={{ color: "red" }}
                                />
                            );
                        case "pending":
                            return (
                                <IoRadioButtonOffSharp
                                    fontSize={"25px"}
                                    style={{ color: "orange" }}
                                />
                            );
                        default:
                            return null;
                    }
                },
            },
            {
                Header: "Message",
                accessor: "message",
            },
            {
                Header: "Last Check",
                accessor: "lastCheck",
            },
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Transcript",
                accessor: "transcript",
                Cell: () => (
                    <div>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip id="tooltip-top">Download</Tooltip>}
                        >
                            <span style={{ cursor: "pointer" }}>
                                <IoDocumentOutline size={18} />
                            </span>
                        </OverlayTrigger>
                    </div>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <Container fluid>
            <FormGroup>
                <Input
                    id="selectAll"
                    name="selectAll"
                    type="checkbox"
                // checked={selectAllChecked}
                // onChange={handleSelectAllChange}
                />
                <Label for="select_all" className="ms-3">
                    Select All
                </Label>
            </FormGroup>
            <Row>
                <Col md="12">
                    <CardBody>
                        <Table {...getTableProps()}>
                            <thead className="text-primary">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} className="text-center">
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr style={{textAlign:"center"}} {...row.getRowProps()} >
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()} style={{ border: "none" }}>
                                                    {cell.render("Cell")}
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
    );
};

export default AddTranscripts;
