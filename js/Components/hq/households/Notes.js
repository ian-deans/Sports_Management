import React from "react";
import { connect } from "react-redux";
import { Form, Grid, TextArea } from "semantic-ui-react";
import { Button, Panel } from "../../common";
import { updateHousehold } from "../../../actions/hq"

//TODO: Add edit/save functionality so org admins can add notes.

class Notes extends React.Component {

  state = {
    edit: false,
    value: null,
    saving: false,
  };

  handleChange = (event, data) => {
    if (this.state.edit) {
      this.setState({value: data.value})
    }
  };

  handleSaveChanges = async () => {
    const id = this.props.id;
    const notes = this.state.value;
    this.setState({saving: true});
    // try {
      await this.props.updateHousehold({id, notes})
    // } catch(error) {

    // }
    this.setState({
      edit: false,
      saving: false,
      value: null,
    })
  };

  handleToggleEdit = () =>
    this.setState({
      edit: true,
      value: this.props.notes ? this.props.notes : "",
    }
  );

  notes = () => {
    if (this.state.edit) {
      return this.state.value;
    }

    if (this.props.notes) {
      return this.props.notes;
    }

    return "";
  };

  render() {
    const notes = this.notes();
    const button = this.state.edit 
      ? (
        <Button 
          onClick={this.handleSaveChanges}
          color="green"
          loading={this.state.saving}
        >Save</Button>)
      : (<Button onClick={this.handleToggleEdit}>Edit</Button>);
    return (
      <NotesContainer>
        <Form>
          <TextArea value={notes} onChange={this.handleChange} />
        </Form>
        {button}
      </NotesContainer>
    )
  }
};

const NotesContainer = ({children}) => (
  <Panel className="component-hq-households-notes">
    <Panel.Header text="Notes" />
    <div className="flexbox column">
      {children}
    </div>
  </Panel>
);

const mapStateToProps = ({hq: {households: { info }}}) => ({
  notes: info ? info.notes : "",
  id: info && info.id,
});

const mapDispatchToProps = {
  updateHousehold,
};


export default connect(mapStateToProps, mapDispatchToProps)(Notes);