import React from "react";
import { Table } from "reactstrap";
import YearPicker from "./YearPicker";
import "./table.scss";
import QuarterPicker from "./QuarterPicker";

const AvailableTableComponent = ({
  transcripts,
  handleYearChange,
  showQuarter,
  minYear,
  maxYear,
}) => {
  showQuarter = true;
  return (
    <div className="table_wrapper">
      <Table className="table_container">
        <thead>
          <tr>
            <td></td>
            <td>Tax Year</td>
            <td>Tax Form</td>
            {/* {showQuarter &&<td>Tax Quarter</td>} */}
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
                <td>{item.taxYear}</td>
                <td>{item.taxForm}</td>
              </tr>
            );
          })}
          {/* {showQuarter &&
            transcripts?.slice(transcripts.length - 1)?.map((item) => {
              let _checked = item.isChecked;
              let index = transcripts.length - 1;
              return (
                <tr key={index}>
                  <th scope="row"></th>
                  <td>Quarter</td>
                  <td>
                    <QuarterPicker
                      selectedYear={item.fromTaxYear}
                      handleChange={(e) =>
                        handleYearChange(index, "quarter", e.target.value)
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
                        handleYearChange(index, "quarter", e.target.value)
                      }
                      name={`toTaxYear-${index}`}
                      value={item.quarter}
                    />
                  </td>
                </tr>
              );
            })} */}
        </tbody>
      </Table>
    </div>
  );
};

export default AvailableTableComponent;
