import React from "react";
import { connect } from "react-redux";
import { TableContained } from "../../common";

const headerItems = ["Registrations"];
const columnData = new Map([
  ["Image", "field_name"],
  ["Player Name", "field_name"],
  ["Birthday", "field_name"],
  ["Parent", "field_name"],
  ["Email", "field_name"],
  ["Phone", "field_name"],
  ["Paid", "field_name"],
  ["Pending", "field_name"],
]);

const RegistrationsTable = ({registrations}) => {
  return (
    <TableContained 
      header={headerItems}
      columns={columnData}
      rowData={registrations}
    />
  )
};

const mapStateToProps = state => ({
  registrations: state.hq.root.registrations,
});

export default connect(mapStateToProps)(RegistrationsTable);