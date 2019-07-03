import React from 'react';
import { Divider, Grid, Form, Image } from 'semantic-ui-react';
import { Button, Dropdown, ErrorBoundary, Header } from '../../../common';

const addUserIcon = "/images/icons/add_user.png";

class RelationshipSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableMemebers: [],
      unavailableFamilyMembers: [],
    };
  }

  componentDidMount() {
    const { familyMembers } = this.props;
    const availableMembers = familyMembers.map(member => ({
      key: member.id,
      text: member.name,
      value: member.id
    }));
    const unavailableFamilyMembers = [];
    this.setState({ availableMembers, unavailableFamilyMembers });
  }

  handleRemoveRelationshipEntry = index => {
    this.props.removeRelationshipEntry(index);
  };

  handleChange = (event, data) => {
    //TODO: Add logic to let users only select family
    //      members not already selected
    this.props.handleChangeFn('relationshipData', data);
  };

  // Having the Root component force the user to wait until resources are loaded solves this issue of possibly
  // not having data in props during the componentDidMount phase. Otherwise getDerivcedStateFromProps could be used
  // to keep local state in sync with props.

  // static getDerivedStateFromProps(nextProps, state) {
  //   if ( nextProps.familyMembers !== state.familyMembers ) {
  //     return {
  //       familyMembers: nextProps.familyMembers,
  //     }
  //   }
  // }

  render() {
    const {
      relationships,
      relationshipTypes,
      addRelationshipEntry,
      removeRelationshipEntry
    } = this.props;
    const { availableMembers } = this.state;
    return (
      <ErrorBoundary>
        <Grid.Row columns="equal" className="form-section">
          <Grid.Column stretched width={3}>
            <Header as="h5">Relationships</Header>
          </Grid.Column>

          <Grid.Column width={13}>
            {relationships.map((relationship, i) => {
              return (
                <RelationshipConfiguration
                  key={i}
                  index={i}
                  availableMembers={availableMembers}
                  relationshipTypes={relationshipTypes}
                  relationship={relationship}
                  handleChangeFn={this.handleChange}
                  removeRelationshipEntryFn={this.handleRemoveRelationshipEntry}
                />
              );
            })}
            <div className="flexbox aligned center">
              <span
                onClick={addRelationshipEntry}
                className="flexbox aligned center add-relationship-entry-btn"
              >
                <Image src={addUserIcon} /> <span>Add Another</span>
              </span>
            </div>
          </Grid.Column>
        </Grid.Row>
      </ErrorBoundary>
    );
  }
}

export default RelationshipSection;

const RelationshipConfiguration = ({
  index,
  availableMembers,
  relationshipTypes,
  relationship: { member, relation, communications, financials },
  handleChangeFn,
  removeRelationshipEntryFn
}) => {
  return (
    <React.Fragment>
      <Form.Group widths={2} key={index}>
        <Form.Field>
          <Dropdown
            key={index}
            options={availableMembers}
            onChange={handleChangeFn}
            value={member}
            placeholder="Household Member"
            selection
            name={`member_${index}`}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            key={index}
            options={relationshipTypes}
            onChange={handleChangeFn}
            value={relation}
            placeholder="Relationship"
            selection
            name={`relation_${index}`}
          />
        </Form.Field>
        <Button onClick={() => removeRelationshipEntryFn(index)}>Remove</Button>
      </Form.Group>
      <Form.Group className="buffer-top">
        <Form.Checkbox
          onChange={handleChangeFn}
          name={`communications_${index}`}
          label="Receive Team Communications"
          checked={communications}
        />
        <Form.Checkbox
          onChange={handleChangeFn}
          name={`financials_${index}`}
          label="Access Financials"
          checked={financials}
        />
      </Form.Group>
      <Divider />
    </React.Fragment>
  );
};
