import React from 'react';
import { connect } from "react-redux"
import { Button, FileUpload } from "../../../Components/common";
import { uploadPhotoId } from "../../../actions/organizationSetup";

class ProofOfId extends React.Component {

  state = {
    saving: false,
    error: null,
    file: null,
  };

  setFile = (acceptedFile) => {
    console.log('Setting File: ', acceptedFile);
    const state = { ...this.state };
    state.file = acceptedFile;
    this.setState(state);
  };


  save = async () => {
    this.setState({ saving: true });
    const { file } = this.state;
    const formData = new FormData();

    formData.append('file_field_name', 'proof_of_id_image');
    formData.append('proof_of_id_image', file);
    try {
      await this.props.uploadPhotoId(formData);
      this.setState({ saving: false });
    } catch (error) {
      console.error(error)
      this.setState({ saving: false, error: "An error occurred, check console." })
    }
  };


  render() {
    const { error, saving } = this.state;
    const classes = ["flexbox", "justified-space-around"].join(" ");
    return (
      <React.Fragment>
        <div className={classes}>
          <FileUpload setFile={this.setFile} />
          {/* <FileUpload setFile={this.setBackFile} /> */}
        </div>
        {error && (<span>{error}</span>)}
        <div>
          <Button loading={saving} onClick={this.save}>Save</Button>
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = {
  uploadPhotoId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProofOfId);