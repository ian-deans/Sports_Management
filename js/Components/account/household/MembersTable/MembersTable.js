import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import { Button, TableContained } from "../../../common";
import { ACCOUNT_ADD_HOUSEHOLD_MEMBER_URL } from "../../../../config/urls";

const NewMemberButton = () =>
  <Button as={Link} to={ACCOUNT_ADD_HOUSEHOLD_MEMBER_URL} color="black">
    Add New
  </Button>;

const Menu = () => {
  return (
    <Dropdown
      direction="left"
      className="link item"
    >
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};


const headerItems = ["Members", <NewMemberButton />];
const columnData = new Map([
  ["Image", "profile_image_path"],
  ["First Name", "first_name"],
  ["Last Name", "last_name"],
  ["Gender", "gender"],
  ["Birthdate", "birthdate"]
]);
const rowExtras =  [<Menu />];

const MembersTableContainer = ({members}) => {
  return (
    <TableContained
      header={headerItems}
      columns={columnData}
      rowData={members}
      extras={rowExtras}
    />
  )
}

const mapStateToProps = state => ({
  members: state.account.root.household_members,
});

export default connect(mapStateToProps)(MembersTableContainer)