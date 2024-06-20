import React from "react";
import { Input } from "reactstrap";

const YearPicker = ({
  minYear = 1990,
  maxYear,
  selectedYear,
  handleChange,
  name,
  value,
}) => {
  if (!maxYear) {
    maxYear = new Date().getFullYear();
  }

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, index) => minYear + index
  );

  return (
    <>
      <Input
        type="select"
        id="year-picker"
        name={name}
        value={value}
        onChange={handleChange}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Input>
    </>
  );
};

export default YearPicker;
