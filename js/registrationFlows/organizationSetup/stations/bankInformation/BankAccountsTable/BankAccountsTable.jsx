import React from "react";
import { Table } from "semantic-ui-react";

export const BankAccountsTable = ( { bankAccounts = [] } ) => {
  const rows = generateRows( bankAccounts );
  return (
    <Table basic textAlign="center" padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Owner ID</Table.HeaderCell>
          <Table.HeaderCell>Is Default</Table.HeaderCell>
          <Table.HeaderCell>Added On</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { rows }
      </Table.Body>
    </Table >
  );
};


function generateRows( bankAccounts ) {
  const generateRow = ( data, index ) => {
    const bankAccount = Object.values( selectFields( data ) );
    return (
      <Row
        key={ index }
        data={ bankAccount }
      />
    );
  };

  return bankAccounts.map( generateRow );
}

function Row( { data } ) {
  const cells = data.map( wrapInCell );
  return <Table.Row>{ cells }</Table.Row>;
}

function wrapInCell( data, i ) {
  if ( typeof data === "boolean" ) {
    data = data === true ? "yes" : "no";
  }
  return (
    <Table.Cell key={ i }>
      { data }
    </Table.Cell>
  );
}


/* eslint-disable camelcase */
function selectFields( { id, owner_id, is_default, created_at } ) {
  return { id, owner_id, is_default, created_at };
}