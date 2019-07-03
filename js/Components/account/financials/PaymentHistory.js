import React from "react";
import { Checkbox } from "semantic-ui-react";
import { Table } from "../../common";

const PaymentHistory = props => {
  const header = {
    text: "Payment History"
  };
  return <Table header={header} columnNames={props.columnNames} />;
};

PaymentHistory.defaultProps = {
  columnNames: [
    <Checkbox />,
    "Logo",
    "Organization",
    "Program",
    "Order No.",
    "Date",
    "Payment"
  ]
};

export default PaymentHistory;
