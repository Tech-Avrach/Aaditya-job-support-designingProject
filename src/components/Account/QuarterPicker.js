import React from "react";

const QuarterPicker = ({ selectedQuarter, handleChange, name }) => {
  const quarters = [
    { key: "Q1", label: "Q1 (JAN-MAR)" },
    { key: "Q2", label: "Q2 (APR-JUN)" },
    { key: "Q3", label: "Q3 (JUL-SEP)" },
    { key: "Q4", label: "Q4 (OCT-DEC)" },
  ];

  return (
    <select
      style={{ padding: "3px 5px", width: "75px" }}
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
    </select>
  );
};

export default QuarterPicker;
