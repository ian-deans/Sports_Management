import React from "react";
import { connect } from "react-redux";
import TableContained from "../components/common/Table/TableContained";


const headerItems = ["Members", <button>Add New</button>];
const columnData = new Map( [
  ["Image", "profile_image_path"],
  ["First Name", "first_name"],
  ["Last Name", "last_name"],
  ["Gender", "gender"],
  ["Birthdate", "birthdate"]
] );
const rowExtras =  [<button>edit</button>,<button>delete</button>];


const TableContainer = ( {members} ) => {
  return (
    <div className="flexbox column aligned center justified center">
      <TableContained
        header={headerItems}
        columns={columnData}
        rowData={members}
        extras={rowExtras}
      />
    </div>
  );
};

const mapStateToProps = state => ( {
  members: state.account.root.household_members,
} );

export default connect( mapStateToProps )( TableContainer );
