import React from "react";
import { Input } from "reactstrap";

const QuarterPicker = ({ selectedQuarter, handleChange, name }) => {
  const quarters = [
    { key: "Q1", label: "Q1 (JAN-MAR)" },
    { key: "Q2", label: "Q2 (APR-JUN)" },
    { key: "Q3", label: "Q3 (JUL-SEP)" },
    { key: "Q4", label: "Q4 (OCT-DEC)" },
  ];

  return (
    <Input
      type="select"
      // style={{ padding: "3px 5px" }}
      id="quarter-picker"
      name={name}
      value={selectedQuarter}
      onChange={handleChange}
    >
      {quarters.map((quarter) => (
        <option key={quarter.key} value={quarter.key}>
          {quarter.label}
        </option>
      ))}
    </Input>
  );
};

export default QuarterPicker;
