import React, { useState } from "react";
import { connect } from "react-redux";
import { updateLegalRepresentative, updateField } from "../../../../../redux/modules/organizationSetup/dispatchers";
import LegalRepresentativeForm from "./LegalRepresentativeForm";
import * as log from "../../../../../helpers/log";


const container = ( { data = {}, updateLegalRepresentative, updateField } ) => {
  const [ saving, setSaving ] = useState( false );
  const [ error, setError ] = useState( "" );

  const save = async () => {
    setSaving( true );
    try {
      await updateLegalRepresentative();
      setSaving( false );
    } catch ( error ) {
      log.error( error );
      setError( "Error occurred. Check console." );
      setSaving( false );
    }
  };

  const handleChange = ( event, data ) => {
    const args = {
      section: "legalRepresentative",
      fieldName: data.name,
      value: data.value,
    };
    updateField( args );
  };

  const formProps = {
    data,
    saving,
    save,
    handleChange,
    error
  };

  return (
    <LegalRepresentativeForm { ...formProps } />
  );
};


const mapStateToProps = state => ( {
  data: state.organizationSetup.legalRepresentative,
} );

const mapDispatchToProps = {
  updateLegalRepresentative,
  updateField,
};

export const LegalRepresentativeContainer = connect( mapStateToProps, mapDispatchToProps )( container );