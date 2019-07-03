import React from "react";
import { connect } from "react-redux";
import { TableContained } from "../../common";

const headerItems = ["Orders"];

//* Unknown field names
const columnData = new Map([
  ["Image", "field_name"],
  ["Player Name", "field_name"],
  ["Organization", "field_name"], //? Would an org see orders from another org?
  ["Program Name", "field_name"],
  ["Type", "field_name"],
  ["Date", "field_name"],
  ["Order ID", "field_name"],
  ["Payment", "field_name"],
  ["Balance", "field_name"],
]);

const OrdersTable = ({orders}) => {
  return (
    <TableContained 
      header={headerItems}
      columns={columnData}
      rowData={orders}
    />
  )
};

const mapStateToProps = state => ({
  orders: state.hq.households.orders,
});

export default connect(mapStateToProps)(OrdersTable);