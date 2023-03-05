import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const BootstrapTable = ({ headers, data, deleteFn, editFn }) => {
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
                return <td key={index}>{property}</td>;
              })}
              <td>
                <Button
                  variant="outline-success"
                  onClick={() => editFn(row.id)}
                >
                  <img
                    width="28px"
                    src="/icons/pencil.svg"
                    alt="Edit Button"
                  ></img>
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => deleteFn(row.id)}
                >
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
