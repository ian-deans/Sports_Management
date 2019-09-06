import React, { useState } from "react";
import { connect } from "react-redux";
import { uploadLogoImage } from "../../../../../redux/modules/organizationSetup/dispatchers";
import { ErrorBoundary, FileUpload } from "../../../../../components/common";

const container = ( { uploadLogoImage } ) => {
  const [ logoFile, setFile ] = useState( {} );

  const setLogoFile = acceptedFile => {
    setFile( acceptedFile[ 0 ] );
  };

  const uploadLogoFile = () => {
    uploadLogoImage( logoFile );
  };

  return (
    <ErrorBoundary>
      <FileUpload
        label="Logo Image"
        fileName={ logoFile && logoFile.name }
        setFile={ setLogoFile }
      />
      <button onClick={uploadLogoFile}>Upload</button>
    </ErrorBoundary>
  );
};


const mapStateToProps = () => ( {} );

const mapDispatchToProps = {
  uploadLogoImage,
};

export const LogoUploadContainer = connect( mapStateToProps, mapDispatchToProps )( container );
