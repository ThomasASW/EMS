import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

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
      <tbody>
        {data.map((row, index) => {
          return (
            <tr key={index}>
              {Object.values(row).map((property, index) => {
                if (index < Object.values(row).length - 2) {
                  return <td key={index}>{property}</td>;
                } else {
                  return undefined;
                }
              })}
              <td>
                <Button variant="outline-success" onClick={() => row.editFn()}>
                  <img
                    width="28px"
                    src="/icons/pencil.svg"
                    alt="Edit Button"
                  ></img>
                </Button>
                <Button variant="outline-danger" onClick={() => row.deleteFn()}>
                  <img
                    width="28px"
                    src="/icons/trash.svg"
                    alt="Delete Button"
                  ></img>
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default BootstrapTable;
