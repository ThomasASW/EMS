import React from "react";
import Table from "react-bootstrap/Table";

const BootstrapTable = ({ headers, data }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>{data}</tbody>
    </Table>
  );
};

export default BootstrapTable;
