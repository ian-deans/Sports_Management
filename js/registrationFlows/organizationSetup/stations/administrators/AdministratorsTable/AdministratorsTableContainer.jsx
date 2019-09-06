import React from "react";
import { connect } from "react-redux";
// import AdministratorsForm from "../../../components/forms/Administrators/AministratorsForm";
import {
  getStaff,
  getStaffRoles
} from "../../../../../redux/modules/organizationSetup/dispatchers";
import AdministratorsTable from "./AdministratorsTable";


const Container = ( {
  // init,
  staff = {},
} ) => {

  // useMountEffect( init );

  const staffList = Object.values( staff );

  return (
    <AdministratorsTable staff={ staffList } />
  );
};

const mapStateToProps = ( { organizationSetup: { administrators } } ) => ( {
  staff: administrators && administrators.staff,
} );

const mapDispatchToProps = {
  init: () => {
    getStaff();
    getStaffRoles();
  },
};

export const AdministratorsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( Container );

// function useMountEffect( func ) {
//   return React.useEffect( () => func, [] );
// }
