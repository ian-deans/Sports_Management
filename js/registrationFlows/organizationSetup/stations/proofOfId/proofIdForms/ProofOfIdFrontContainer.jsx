import React, { useState } from "react";
import { connect } from "react-redux";
import { FileUpload } from "../../../../../components/common";
import { uploadIdentificationPhoto } from "../../../../../redux/modules/organizationSetup/dispatchers";

const container = ( { uploadIdentificationPhoto } ) => {
  const [ file, setFile ] = useState( {} );

  const handleFile = acceptedFile => {
    setFile( acceptedFile[ 0 ] );
  };

  const save = () => {
    uploadIdentificationPhoto( { file, isFront: true } );
  };

  return (
    <FileUpload label="Front" fileName="file" setFile={ handleFile } />
  );

};

const mapStateToProps = () => ( {} );

const mapDispatchToProps = {
  uploadIdentificationPhoto,
};

export const UploadFrontIdContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( container );