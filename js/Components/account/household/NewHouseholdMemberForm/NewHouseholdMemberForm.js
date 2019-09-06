/* eslint-disable camelcase */
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createNewHouseholdMember } from "../../../../actions/account";

import { Divider, Form, Grid } from "semantic-ui-react";
import { Button, ErrorBoundary, Panel } from "../../../common";
import { error } from "../../../../helpers/log";

import AddressInfoSection from "./AddressInfoSection";
import LoginInfoSection from "./LoginInfoSection";
import PersonalInfoSection from "./PersonalInfoSection";
import RelationshipSection from "./RelationshipSection";

import { genders } from "../../../../config/static-data";

class NewHouseholdMemberForm extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      personalData: { ...this.props.initialState.personalData },
      loginData: { ...this.props.initialState.loginData },
      addressData: { ...this.props.initialState.addressData },
      relationships: [{ ...relationshipEntry }],
      error: null,
      loading: false,
    };
  }

  isDateData = name => name === "day" || name === "month" || name === "year";

  addRelationshipEntry = () => {
    let state = { ...this.state };
    state.relationships.push( { ...relationshipEntry } );
    this.setState( state );
  };

  removeRelationshipEntry = index => {
    let state = { ...this.state };
    if ( this.state.relationships.length > 1 ) {
      state.relationships.splice( index, 1 );
      return this.setState( state );

    } else if ( this.state.relationships.length === 1 ) {
      state.relationships = [{ ...relationshipEntry }];
      return this.setState( state );
    }
  };

  hasEmptyFields = data => {
    const success = Object.values( data ).map( value => value === "" );
    return success.includes( true );
  };

  handleChange = ( section, data ) => {
    let state = { ...this.state };

    if ( section === "personalData" ) {
      if ( this.isDateData( data.name ) ) {
        state.personalData.birthdate[data.name] = data.value;
      } else {
        state.personalData[data.name] = data.value;
      }
    } else if ( section === "addressData" ) {
      if ( data.name === "sameAddress" ) {
        state.addressData.sameAddress = data.checked;
      } else {
        state.addressData[data.name] = data.value;
      }
    } else if ( section === "loginData" ) {
      if ( data.name === "sendInvite" ) {
        state.loginData.sendInvite = data.checked;
      } else {
        state.loginData[data.name] = data.value;
      }
    } else if ( section === "relationshipData" ) {
      let fields = data.name.split( "_" );
      if ( fields[0] === "communications" || fields[0] === "financials" ) {
        state.relationships[fields[1]][fields[0]] = data.checked;
      } else {
        state.relationships[fields[1]][fields[0]] = data.value;
      }
    }

    state.error = null;

    this.setState( state );
  };

  handleSubmit = async () => {
    const { personalData, addressData, loginData, relationships } = this.state;

    if ( this.hasEmptyFields( personalData ) ) {
      return this.setState( { error: "Some fields were left blank." } );
    }

    if ( !addressData.sameAddress && this.hasEmptyFields( addressData ) ) {
      return this.setState( { error: "Must supply address information." } );
    }

    this.setState( {loading: true} );
    await this.props.createNewHouseholdMember( {
      personalData,
      addressData,
      loginData,
      relationships
    } )
      .catch( err => {
        error( err );
        this.setState( { err: "Error occured while creating new member."} );
      } );

    this.setState( {loading: false} );

    this.props.history.push( "/app/account/household" );
  };

  render() {
    const {
      personalData,
      addressData,
      loginData,
      relationships,
      error,
      loading
    } = this.state;

    const { usStates, familyMembers, relationshipTypes } = this.props;

    return (
      <Panel.Group>
        <Panel.Header text="Add New Household Member" />
        <Panel.Item>
          <ErrorBoundary>
            <Form className="add-new-member-form" onKeyUp={this.handleKeyUp}>
              <Grid className="add-new-member-grid">
                <PersonalInfoSection
                  {...personalData}
                  handleChangeFn={this.handleChange}
                  genderOptions={genders}
                />

                <Divider />

                <AddressInfoSection
                  {...addressData}
                  handleChangeFn={this.handleChange}
                  usStates={usStates}
                />

                <Divider />

                <LoginInfoSection
                  disabled
                  {...loginData}
                  handleChangeFn={this.handleChange}
                />

                <Divider />

                <RelationshipSection
                  familyMembers={familyMembers}
                  relationshipTypes={relationshipTypes}
                  handleChangeFn={this.handleChange}
                  relationships={relationships}
                  addRelationshipEntry={this.addRelationshipEntry}
                  removeRelationshipEntry={this.removeRelationshipEntry}
                />

                <Divider />

                {error && <Grid.Row>{error}</Grid.Row>}

                <Grid.Row columns="equal" className="fcentered">
                  <Button loading={loading} onClick={this.handleSubmit} color="black">
                    Save
                  </Button>
                </Grid.Row>
              </Grid>
            </Form>
          </ErrorBoundary>
        </Panel.Item>
      </Panel.Group>
    );
  }

  static defaultProps = {
    initialState: {
      personalData: {
        first_name: "",
        last_name: "",
        gender: "",
        birthdate: ""
      },
      loginData: {
        phoneNumber: "",
        email: "",
        sendInvite: false
      },
      addressData: {
        sameAddress: false,
        street1: "",
        city: "",
        state_id: "",
        zip: ""
      },
      relationships: [{ ...relationshipEntry }]
    }
  };
}

const relationshipEntry = {
  member: "",
  relation: "",
  financials: false,
  communications: false
};

const mapStateToProps = state => {
  // try {
  return {
    usStates: state.ui.usStates,
    relationshipTypes: state.ui.relationshipTypes,
    familyMembers: state.account.root.household_members.map( member => ( {
      id: member.id,
      name: member.first_name,
    } ) )
  };
  // } catch (error) {
  //   //TODO: Log/Report Error
  //   return {};
  // }
};

const mapDispatchToProps = {
  createNewHouseholdMember
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )( NewHouseholdMemberForm )
);
