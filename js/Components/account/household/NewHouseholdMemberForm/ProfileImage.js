import React from "react";
import { Button, Image } from "semantic-ui-react";
const avatarImage = "/images/icons/avatar.png"

class ProfileImage extends React.Component {

  state = {
    edit: false,
    loading: false,
    body: null,
  }

  handleChange = (event, data) => {
    // const data = new FormData();
    // const files = Array.from(event.target.files)
    const formData = new FormData();
    formData.append("file_field_name", "profile_image");
    formData.append("profile_image", event.target.files[0]);
    this.setState({body: formData })
  }

  toggleEdit = () => {
    return this.setState({edit: true});
  }

  handleUpload = async () => {
    this.setState({loading: true});
    const { body } = this.state;
    fetch("http://localhost:3000/api/v1/people/121/files", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        // "Accept": "multipart/form-data",
      },
      body: body,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)      
    })
    console.log('finished')

  }

  render() {

    if (this.state.edit){
      return (
        <div className="component-profile-image">
          <form className="flexbox column justified-center aligned-center">
            <input type="file" name="file" onChange={this.handleChange} />
            <Button loading={this.state.loading} onClick={this.handleUpload}>Save</Button>
          </form>
        </div>
      )
    }

    return (
      <div className="component-profile-image">
        <div className="flexbox column aligned-center justified-center">
          <Image size="tiny" src={avatarImage} />
          <button onClick={this.toggleEdit}>Edit</button>
        </div>
      </div>
    );
  };
};

export default ProfileImage;