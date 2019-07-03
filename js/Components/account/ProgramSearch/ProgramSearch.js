import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { programSearch } from "../../../actions/account";
import { lastInPath } from "../../../utilities";
import { Form } from "semantic-ui-react";
import { Button, Dropdown, Input, Panel } from "../../common";

const URL = "/programs";

class ProgramSearch extends React.Component {
  state = {
    options: {
      organizationName: "",
      sport_id: "",
      type_id: "",
      zipCode: "",
    },
    loading: false,
    error: null,
  };

  handleChange = (event, data) => {
    const state = {...this.state};
    state.options[data.name] = data.value;
    this.setState(state);
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {location:{pathname}} = this.props;
    
    const options = this.state.options;
    this.setState({loading: true, error: null});
    const response = await this.props.programSearch(options);
    if (response) {
      return this.setState({loading: false, error: 'No Results'});
    }

    const currentView = lastInPath(pathname);
    this.setState({loading: false});

    if (currentView !== "programs") {
      this.props.history.push("/app/account/programs");
    }
  };

  render() {
    const { options: {organizationName, sport, programType, zipCode}, loading } = this.state;
    const { programTypes, sportTypes, location: {pathname} } = this.props;

    const currentView = lastInPath(pathname);

    if (currentView === "register") {
      return null;
    }

    return (
      <Panel.Group>
        <Panel.Header text="Find A Program" />
        <Panel.Item className="flexbox aligned center">
        
          <Form className="program-search-form" onSubmit={this.handleSubmit}>
            <Form.Group className="main-group" widths="equal">
              { (currentView !== "account") && (
                <Form.Field width={ 10 } className="organization-name-field">
                  <React.Fragment>
                    <label>Organization</label>
                    <Input
                      onChange={this.handleChange}
                      placeholder="Search"
                      value={organizationName}
                      tabIndex={0}
                      className="organization-name-input"
                      name="organization_name"
                    />
                  </React.Fragment>
                </Form.Field>
              )}

              <Form.Field>
                <Form.Group
                  className="inner-group"
                  widths="equal"
                >
                  <Form.Field className="sport-type-field">
                    <label>Sport</label>
                    <Dropdown
                      options={sportTypes}
                      onChange={this.handleChange}
                      value={sport}
                      placeholder="Sport"
                      className="sport-type-dropdown"
                      name="sport_id"
                      fluid
                      selection
                      clearable
                    />
                  </Form.Field>
                  <Form.Field className="program-type-field">
                    <label>Type</label>
                    <Dropdown
                      options={programTypes}
                      onChange={this.handleChange}
                      value={programType}
                      placeholder="Type"
                      className="program-type-dropdown"
                      name="type_id"
                      fluid
                      selection
                      clearable
                    />
                  </Form.Field>
                  <Form.Field className="zip-code-field">
                    <label>Zip Code</label>
                    <Input.ZipCode
                      onChange={this.handleChange}
                      value={zipCode}
                      tabIndex={0}
                      className="zip-code-dropdown"
                      name="zipCode"
                    />
                  </Form.Field>
                </Form.Group>
              </Form.Field>

              <Form.Field width={6} className="search-submit-field">
                <Button
                  // as={Link}
                  // to={linkUrl}
                  // onClick={this.handleSubmit}
                  basic
                  color="black"
                  className="search-submit-btn"
                  loading={loading}
                >
                  Search
                </Button>
              </Form.Field>
            </Form.Group>
          </Form>
        </Panel.Item>
        {this.state.error}
      </Panel.Group>
    );
  }
}

const mapStateToProps = state => ({
  programTypes: state.ui.programTypes,
  sportTypes: state.ui.sportTypes,
});

const mapDispatchToProps = {
  programSearch
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramSearch));
