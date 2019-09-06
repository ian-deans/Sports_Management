import React from "react";
import { connect } from "react-redux";
import { TableContained } from "../../common";

const headerItems = ["Members"];
const columnData = new Map( [
  ["Image", "profile_image_path"],
  ["Name", "full_name"],
  ["Type", "type"],
  ["Gender", "gender"],
  ["Birthdate", "birthdate"],
  ["ID", "id"],
  ["Email", "email"],
  ["Mobile", "mobile_number"]
] );

const MembersTable = ( {members} ) => {
  return (
    <TableContained
      header={headerItems}
      columns={columnData}
      rowData={members}
    />
  );
};

const mapStateToProps = state => ( {
  members: state.hq.households.members,
} );

export default connect( mapStateToProps )( MembersTable );