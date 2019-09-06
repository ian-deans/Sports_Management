import React from "react";
import { connect } from "react-redux";
import { Button, FileUpload, Panel } from "../../../../components/common";
import { uploadPhotoId } from "../../../../redux/modules/organizationSetup/dispatchers";
import { dev } from "../../../../helpers/log";
import { UploadFrontIdContainer } from "./proofIdForms/ProofOfIdFrontContainer";

class ProofOfId extends React.Component {

  state = {
    saving: false,
    error: null,
    files: {},
  };


  setFrontFile = acceptedFile => {
    const state = { ...this.state };
    state.files.front = acceptedFile[ 0 ];
    this.setState( state );
  }

  setBackFile = acceptedFile => {
    const state = { ...this.state };
    state.files.back = acceptedFile[ 0 ];
    this.setState( state );
  }


  save = async () => {
    const { front, back } = this.state.files;

    if ( !front || !back ) {
      return this.setState( { error: "Both images are required." } );
    }

    this.setState( { saving: true } );
    const uploads = [];

    if ( front ) {
      uploads.push( uploadSingleFile( { file: front, isFront: true } ) );
    }

    if ( back ) {
      uploads.push( uploadSingleFile( { file: back, isFront: false } ) );
    }

    try {
      const response = await Promise.all( uploads );
      dev( response );
      this.setState( { saving: false } );

    } catch ( error ) {
      dev( "Error Caught By REACT :: ", error.message );
      this.setState( { saving: false, error: error.message } );
    }
  };


  render() {
    // const { error, saving, files } = this.state;
    const classes = [ "flexbox", "justified-evenly" ].join( " " );
    // const frontFile = files.front ? files.front.name : null;
    // const backFile = files.back ? files.back.name : null;

    return (
      <Panel.Group>
        <Panel.Header text="Proof Of ID" />
        <Panel.Item className="component-form-proof-of-id">
          <div>
            <div className={ classes }>
              <UploadFrontIdContainer />
              {/* <FileUpload label="Front" fileName={ frontFile } setFile={ this.setFrontFile } /> */}
              {/* <FileUpload label="Back" fileName={ backFile } setFile={ this.setBackFile } /> */}
            </div>
          </div>
          {/* { error && ( <span>{ error }</span> ) } */}
          <div className="flexbox justified-center">
            <Button loading={ saving } onClick={ this.save }>Save</Button>
          </div>
        </Panel.Item>
      </Panel.Group>
    );
  }
}


const mapStateToProps = () => ( {} );

const mapDispatchToProps = {
  uploadPhotoId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( ProofOfId );