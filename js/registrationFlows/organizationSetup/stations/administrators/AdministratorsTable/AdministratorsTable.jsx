import React from "react";
import { Checkbox, Table } from "semantic-ui-react";
import { AvatarImage, Button } from "../../../../../components/common";
import "./AdministratorsTable.less";

const AdministratorTable = ( { staff = [], openEdit } ) => {
  /**
   * receive array of staff members through props
   * receive function to open modal for use with new member/new role forms
   * create an array of Table.Rows based on staff data
   * render rows
   */
  const rows = generateRows( staff, openEdit );
  return (
    <Table basic textAlign="center" padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
          <Table.HeaderCell>Access</Table.HeaderCell>
          <Table.HeaderCell>Edit</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { rows }
      </Table.Body>
    </Table >
  );
};

export default AdministratorTable;

function generateRows( staff, openEditFn ) {

  const generateRow = ( data, index ) => {
    const member = Object.values( selectFields( data ) );

    const avatar = wrapInAvatarImage( data.profile_image_path );
    member.unshift( avatar );

    member.unshift( <Checkbox /> );

    const editButton = ( <Button onClick={ () => openEditFn( data.id ) }>...</Button> );
    member.push( editButton );

    // const dropDown = //? Access Dropdown
    return (
      <Row
        key={ index }
        data={ member }
      />
    );
  };

  return staff.map( generateRow );
}


function Row( { data } ) {
  const cells = data.map( wrapInCell );
  return <Table.Row>{ cells }</Table.Row>;
}

function wrapInCell( data, i ) {
  return (
    <Table.Cell key={ i }>
      { data }
    </Table.Cell>
  );
}

function wrapInAvatarImage( src ) {
  return <AvatarImage src={ src } />;
}


/* eslint-disable camelcase */
function selectFields( { full_name, phone, id, } ) {
  return { full_name, phone, id };
}