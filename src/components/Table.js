import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";

const Table = () => {
  const ogData = require("../CardSphereFrank.json");
  const [data, setData] = useState(require("../CardSphereFrank.json"));

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "Name",
      },
      {
        Header: "Edition",
        accessor: "Edition",
      },
      {
        Header: "Condition",
        accessor: "Condition",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  const filteredData = (ogData, term) => {
    const filtered = ogData.filter((card) => {
      return card.Name.toLowerCase().includes(term.toLowerCase());
    });
    console.log(filtered);
    setData(filtered);
  };

  return (
    <>
      <input
        type="text"
        onChange={(event) => {
          filteredData(ogData, event.target.value);
        }}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "solid 3px darkgray",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : "↕️"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "aliceblue",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
