import React from "react";


class HouseholdMemberForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };

  }

  render() {

    return (
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
            <Button onClick={this.handleSubmit} color="black">
              Save
                  </Button>
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}





const initialState = {
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
  relationships: [],
};