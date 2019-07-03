import React from "react";
import { connect } from "react-redux";
import { TableContained } from "../../common";

const headerItems = ["Documents"];
const columnData = new Map([
  ["Player", "field_name"],
  ["Player Name", "field_name"],
  ["Name", "field_name"],
  ["Type", "field_name"],
  ["Date", "field_name"],
]);

const DocumentsTable = ({documents}) => {

  return (
    <TableContained 
      header={headerItems}
      columns={columnData}
      rowData={documents}
    />
  )
};

const mapStateToProps = state => ({
  documents: state.hq.households.documents,
});

export default connect(mapStateToProps)(DocumentsTable);