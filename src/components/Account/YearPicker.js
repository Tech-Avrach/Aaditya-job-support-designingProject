import React from "react";

const YearPicker = ({
  minYear = 1990,
  maxYear,
  selectedYear,
  handleChange,
  name,
  value
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
      <select
        // border: "1px solid red"
        style={{ padding: "6px 7px" }}
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
      </select>
    </>
  );
};

export default YearPicker;
