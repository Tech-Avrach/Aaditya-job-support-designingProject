import React from "react";
import { Table } from "reactstrap";
import YearPicker from "./YearPicker";
import "./table.scss";
import QuarterPicker from "./QuarterPicker";

const TableComponent = ({
  transcripts,
  handleYearChange,
  showQuarter,
  minYear,
  maxYear,
}) => {
  return (
    <Table className="table_container">
      <thead>
        <tr>
          <td></td>
          <td>Tax Form</td>
          <td>From</td>
          <td>To</td>
        </tr>
      </thead>
      <tbody>
        {transcripts?.map((item, index) => {
          let _checked = item.isChecked;
          return (
            <tr key={index}>
              <th scope="row">
                <input
                  type="checkbox"
                  checked={_checked}
                  onChange={() =>
                    handleYearChange(index, "isChecked", !_checked)
                  }
                />
              </th>
              <td>{item.formNumber}</td>
              <td>
                <YearPicker
                  minYear={minYear}
                  maxYear={maxYear}
                  selectedYear={item.fromTaxYear}
                  handleChange={(e) =>
                    handleYearChange(index, "fromTaxYear", e.target.value)
                  }
                  name={`fromTaxYear-${index}`}
                  value={item.fromTaxYear}
                />
              </td>
              <td>
                <YearPicker
                  minYear={minYear}
                  maxYear={maxYear}
                  selectedYear={item.toTaxYear}
                  handleChange={(e) =>
                    handleYearChange(index, "toTaxYear", e.target.value)
                  }
                  name={`toTaxYear-${index}`}
                  value={item.toTaxYear}
                />
              </td>
            </tr>
          );
        })}
        {showQuarter &&
          transcripts?.slice(transcripts.length - 1)?.map((item) => {
            let _checked = item.isChecked;
            let index = transcripts.length - 1;
            return (
              <tr key={index}>
                <th scope="row">
                  {/* <input
                    type="checkbox"
                    checked={_checked}
                    onChange={() =>
                      handleYearChange(index, "isChecked", !_checked)
                    }
                  /> */}
                </th>
                <td>Quarter</td>
                <td>
                  <QuarterPicker
                    selectedYear={item.fromTaxYear}
                    handleChange={(e) =>
                      handleYearChange(index, "quarterFrom", e.target.value)
                    }
                    name={`fromTaxYear-${index}`}
                    value={item.quarter}
                  />
                </td>
                <td>
                  <QuarterPicker
                    minYear={1990}
                    maxYear={2025}
                    selectedYear={item.toTaxYear}
                    handleChange={(e) =>
                      handleYearChange(index, "quarterTo", e.target.value)
                    }
                    name={`toTaxYear-${index}`}
                    value={item.quarter}
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default TableComponent;
