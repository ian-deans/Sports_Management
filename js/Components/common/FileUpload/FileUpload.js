import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";

const FileUpload = ( { setFile, label, fileName } ) => {
  const onDrop = useCallback( acceptedFiles => {
    setFile( acceptedFiles );
  }, [] );

  const { getRootProps, getInputProps, isDragActive } = useDropzone( { onDrop } );

  const classes = [
    "flexbox",
    "column",
    "justified-space-around",
    "aligned-center",
    "file-upload"
  ].join( " " );

  return (
    <div className="flexbox column component-form-file-upload">
      <div { ...getRootProps() } className={ classes }>
        <input { ...getInputProps() } />
        <Icon name="cloud upload" size="huge" />
        {
          isDragActive ?
            <p>Drag and drop file here</p> :
            <p>Drag a file here or click to browse</p>
        }

      </div>
      <div className="file-upload-file-name">
        { fileName && ( <p>{ fileName }</p> ) }

      </div>
      <div className="file-upload-label">
        { label && ( <Header as="h3" >{ label }</Header> ) }

      </div>
    </div>
  );
};

export default FileUpload;