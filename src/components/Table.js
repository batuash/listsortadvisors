import React from "react";
import { compose } from "lodash/fp";
import { withSort, withFilter, withInfiniteScroll } from "../hoc/";

const TABLE_COLUMNS = [
  { id: "fname", title: "First Name" },
  { id: "lname", title: "Last Name" },
  { id: "status", title: "Status" },
  { id: "language", title: "Language" },
  { id: "reviews", title: "Reviews" }
];

const Table = props => {
  const { applySort, sortRows, applyFilter, filterRows, advisors } = props;

  return (
    <table>
      <thead>
        <tr>
          {TABLE_COLUMNS.map(({ id, title }, idx) => (
            <th key={`${title}_${idx}`} onClick={applySort(id)}>
              {id === "number" ? "#" : title}
            </th>
          ))}
        </tr>
        <tr className="Table-filter-row">
          {TABLE_COLUMNS.map(({ id, title }, idx) => (
            <th key={`filter_${title}_${idx}`}>
              <input
                type="text"
                onChange={applyFilter(id)}
                placeholder="Filter"
                className="Table-filter-input"
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {compose(
          sortRows,
          filterRows
        )(advisors).map((row, rowIdx) => (
          <tr key={`${row.number}_${rowIdx}`} className="Table-body-row">
            {TABLE_COLUMNS.map(({ id }, celIdx) => (
              <td key={`${row.number}_${celIdx}`}>{row[id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  advisors: []
};

export default compose(
  withInfiniteScroll,
  withSort,
  withFilter
)(Table);
