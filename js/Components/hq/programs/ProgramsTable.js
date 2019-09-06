import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, TableContained } from "../../common";

const headerItems = ["Program", <Button>Add New</Button>];
const columnData = new Map( [
  ["Logo", "logo_image_path"],
  ["Name", "name"],
  ["Registrations", "max_registrations"],
  ["Total Income", "unknown"]
] );

const ProgramsTable = ( {programs} ) => {
  return (
    <TableContained
      header={headerItems}
      columns={columnData}
      rowData={programs}
    />
  );
};

const mapStateToProps = state => ( {
  programs: state.hq.root.programs,
} );

export default withRouter( connect(
  mapStateToProps
)( ProgramsTable ) );
