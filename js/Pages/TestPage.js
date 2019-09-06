import React from "react";
import TableContainer from "./TableContainer_test";

const TestPage = () => {
  const classes = [
    "flexbox",
    "column",
    "aligned",
    "center",
    "justified",
    "center"
  ];

  return (
    <div className={ classes.join( " " ) }>
      <TableContainer />
    </div>
  );
};

export default TestPage;