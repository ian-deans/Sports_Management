import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
// import { SmallSpinner } from "../../../../common";

import {useDropzone} from "react-dropzone";


class UploadDocuments extends React.Component {
  state = {
    loading: true,
    body: null,
  };

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.props.getDocumentsForPlayer();
    this.setState( {loading: false} );
  };

  setFile = file => {
    const formData = new FormData();
    formData.append( "file_field_name", "document" );
    formData.append( "document", file );
    this.setState( {body: formData} );
  }


  documents = () => {

  };

  render() {
    return (
      <React.Fragment>

        <h2>Documents</h2>
        <Segment>
          <DocumentDropzone setFile={this.setFile} />
          <button>Submit</button>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ( {
  documents: state.account.playerRegistration.documents,
} );

export default connect( mapStateToProps )( UploadDocuments );


function DocumentDropzone( {setFile} ) {
  const onDrop = useCallback( acceptedFiles => {
    // console.log( acceptedFiles );
    setFile( acceptedFiles );
  }, [] );

  const {getRootProps, getInputProps, isDragActive} = useDropzone( {onDrop} );

  return (
    <div {...getRootProps()} className="component-account-upload-documents">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop files here, or click to select files</p>
      }
    </div>
  );
}