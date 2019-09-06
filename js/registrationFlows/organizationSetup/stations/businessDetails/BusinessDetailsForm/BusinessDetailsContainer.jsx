import React, { useState } from "react";
import { connect } from "react-redux";
import { updateBusinessDetails, updateField } from "../../../../../redux/modules/organizationSetup/dispatchers";
import { BusinessDetailsForm } from "./BusinessDetailsForm.jsx";
import { ErrorBoundary } from "../../../../../components/common";
import * as log from "../../../../../helpers/log";

const container = ( { details, updateBusinessDetails, updateField } ) => {
  const [ saving, setSaving ] = useState( false );
  const [ error, setError ] = useState( "" );

  const save = async () => {
    setSaving( true );
    try {
      await updateBusinessDetails();
      setSaving( false );
    } catch ( error ) {
      log.error( error );
      setError( "Error occurred. Check console." );
      setSaving( false );
    }
  };

  const handleChange = ( event, data ) => {
    const args = {
      section: "businessDetails",
      fieldName: data.name,
      value: data.value,
    };
    updateField( args );
  };

  const formProps = {
    data: details,
    saving,
    save,
    handleChange,
  };


  return (
    <ErrorBoundary>
      <BusinessDetailsForm { ...formProps } />
      { error }
    </ErrorBoundary>
  );
};


const mapStateToProps = state => ( {
  details: state.organizationSetup.businessDetails && state.organizationSetup.businessDetails,
  logoImagePath: state.organizationSetup.businessDetails && state.organizationSetup.businessDetails.logo_image_path,
} );

const mapDispatchToProps = {
  updateField,
  updateBusinessDetails,
};

export const BusinessDetailsContainer = connect( mapStateToProps, mapDispatchToProps )( container );