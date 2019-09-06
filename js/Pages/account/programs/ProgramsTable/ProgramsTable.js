import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TableContained } from "../../../../components/common";

const headerItems = ["Programs"];
const columnData = new Map( [
  ["Organization", "logo"],
  ["Name", "org_name"],
  ["Program", "name"],
  ["Location", "location"],
  ["Start Date", "start_date"],
  ["End Date", "end_date"],
  ["Price", ""],
] );
const viewButton = ( {id} ) => <Link to={`/app/account/programs/${id}/details`}>View</Link>;
const rowExtras = [viewButton];


const ProgramsTable = ( { programs } ) => {
  return (
    <TableContained
      header={headerItems}
      columns={columnData}
      rowData={programs}
      rowExtras={rowExtras}
    />
  );
};

const mapStateToProps = state => ( {
  programs: state.account.root.program_search_results,
} );

export default connect( mapStateToProps )( ProgramsTable );
