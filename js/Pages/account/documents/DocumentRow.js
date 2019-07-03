import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { Table, Button } from '../../../Components/common';

import { dateFromYYYYMMDD } from '../../../utilities';

const DocumentRow = ( { image, name, player, organization, date } ) => {
  const formattedDate = dateFromYYYYMMDD( date ).format('MMM Do, YYYY')
  return (
    <Table.Row>
      <Table.Cell><Checkbox /></Table.Cell>
      {/* <Table.Cell>
        <Image avatar src={ image } />
      </Table.Cell> */}
      <Table.Cell>{ name }</Table.Cell>
      <Table.Cell>{ player }</Table.Cell>
      <Table.Cell>{ organization }</Table.Cell>
      <Table.Cell>{ formattedDate }</Table.Cell>
      <Table.Cell>
        <Button basic onClick={ () => console.log( 'VIEW DOC' ) }>
          View
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}

export default DocumentRow;