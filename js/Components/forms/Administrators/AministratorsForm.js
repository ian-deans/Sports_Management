import React from "react";
import { connect } from "react-redux";
import { Checkbox } from "semantic-ui-react";
import { Button } from "../../../components/common";

const AdministratorsForm = () => {

  return (
    <div className="component-form-administrators">

      <div className="row header">
        <span>Administrators</span>
        <div>
          <span>
            <Button color="black">Add Roles</Button>
          </span>
          <span>
            <Button color="black">Add New</Button>
          </span>
        </div>
      </div>

      <div className="row entry">
        <span>
          <Checkbox />
          {/* <input type="checkbox" /> */ }
        </span>
        <span>Image</span>
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Access</span>
        <span></span>
      </div>

      <div className="row entry">
        <span>
          <Checkbox />
          {/* <input type="checkbox" /> */ }
        </span>
        <span>
          <img
            src="https://placeimg.com/25/25/animals"
            height="25px"
            width="25px"
          />
        </span>
        <span>Test MacTester</span>
        <span>test@things.com</span>
        <span>909-555-4311</span>
        <span>
          <select>
            <option>Admin</option>
          </select>
        </span>
        <span>
          <span className="edit-menu-btn">...</span>
        </span>
      </div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row"></div>
      <div className="row spacer"></div>

    </div>
  );
};

const mapStateToProps = () => ( {
  // data: state.forms.administrators
} );

export default connect( mapStateToProps )( AdministratorsForm );
