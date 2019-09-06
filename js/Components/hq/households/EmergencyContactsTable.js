import React from "react";
import { connect } from "react-redux";
import { TableContained } from "../../common";

const headerItems = [];
const columnData = new Map( [
  ["Image", "field_name"],
  ["Name", "field_name"],
  ["Relationship", "field_name"],
  ["Email", "field_name"],
  ["Mobile", "field_name"]
] );

const EmergencyContactsTable = ( {contacts} ) => {
  return (
    <TableContained
      header={headerItems}
      columns={columnData}
      rowData={contacts}
    />
  );
};

const mapStateToProps = state => ( {
  contacts: state.hq.households.contacts,
} );

export default connect( mapStateToProps )( EmergencyContactsTable );