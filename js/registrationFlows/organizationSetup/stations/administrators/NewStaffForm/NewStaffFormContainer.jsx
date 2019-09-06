import React, { useState } from "react";
import { connect } from "react-redux";
// import AdministratorsForm from "../../../components/forms/Administrators/AministratorsForm";
import {
  getUsersByEmail,
  saveNewStaffMember,
  setNewStaffPersonId,
  setNewStaffRoleId
} from "../../../../../redux/modules/organizationSetup/dispatchers";
import NewStaffForm from "./NewStaffForm";


const NewStaffFormContainer = ( {
  roles,
  save,
  search,
  users = [],
  selectUser,
  selectRole,
} ) => {


  // const [ error, setError ] = useState( "" );
  const [ email, setEmail ] = useState( "" );
  const usersArray = Object.values( users );

  const handleSetEmail = event => setEmail( event.target.value );
  const handleKeyPress = event => {
    if ( event.key === "Enter" ) {
      search( email );
    }
  };
  const handleSearch = () => search( email );

  return (
    <NewStaffForm
      users={ usersArray }
      roles={ roles }
      save={ save }
      setEmail={ handleSetEmail }
      search={ handleSearch }
      selectUser={ selectUser }
      selectRole={ selectRole }
      keyPressFn={ handleKeyPress }
    />
  );
};

const mapStateToProps = ( { organizationSetup: { newStaff } } ) => ( {
  users: newStaff && newStaff.users,
  userIds: newStaff && newStaff.userIds,
  roles: newStaff && newStaff.rolesDropdownData,
} );

const mapDispatchToProps = {
  save: saveNewStaffMember,
  search: getUsersByEmail,
  selectUser: setNewStaffPersonId,
  selectRole: setNewStaffRoleId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( NewStaffFormContainer );


