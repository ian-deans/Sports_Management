import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({setFile}) => {
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles);
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="component-file-upload">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop files here, or click to select files</p>
      }
    </div>
  )
};

export default FileUpload;