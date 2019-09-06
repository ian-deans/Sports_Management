import React from "react";
import { Button, Dropdown, Icon, Input } from "semantic-ui-react";
import "./NewStaffForm.less";

const NewStaffForm = ( {
  users = [],
  roles = [],
  save,
  search,
  setEmail,
  selectUser,
  // selectRole,
  keyPressFn,
} ) => {
  return (
    <div className="new-staff-form">
      <div className="flexbox user-search-box">

        <Input onChange={ setEmail } onKeyPress={ keyPressFn } />
        <Button onClick={ search }><Icon name="search" /></Button>
      </div>

      <ul className="user-list">
        { users.map( ( user, i ) => (
          <li
            key={ i }
            onClick={ () => selectUser( user.person_id ) }
          >{ user.name }
          </li>
        ) ) }
      </ul>

      <div className="role-list">
        <Dropdown
          options={ roles }
          // onChange={  }
        />
        {/* roles */ }
        {/* { roles.map( ( role, i ) => ( <span
          key={ i }
          onClick={ () => selectRole( role.id ) }
        >{ role.name }
        </span> ) ) } */}
      </div>

      <Button onClick={ save }>Save</Button>
    </div>
  );
};

export default NewStaffForm;