import React from "react";
import { connect } from "react-redux";
import { TableContained } from "../../../components/common";

const headerItems = [ "Documents" ];
const columnData = new Map( [
  [ "Document", "field_name" ],
  [ "Player", "field_name" ],
  [ "Organization", "field_name" ],
  [ "Date", "field_name" ],
  [ "View", "field_name" ],
] );

const DocumentsTableContainer = ( { documents } ) => {
  return (
    <TableContained
      header={ headerItems }
      columns={ columnData }
      rowData={ documents }
    />
  );
};

const mapStateToProps = state => ( {
  documents: state.account.root.documents,
} );

export default connect( mapStateToProps )( DocumentsTableContainer );