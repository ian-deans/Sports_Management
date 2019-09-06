/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { Table } from "../../../../components/common";
import { iconPath, logoPath } from "../../../../constants/imagePaths";
import { dateFromTimestamp } from "../../../../helpers/date";

const caretRight = iconPath + "caret-right.png";
const logoPlaceholder = logoPath + "arsenal-lg.png";


const ProgramTableRow = ( {
  id, name, start_date, end_date, cost_highest, cost_lowest, path,
  organization: { data: { name: orgName, address_city, logo_image_path } },
} ) => {

  return (
    <Table.Row>
      <Table.Cell className="flexbox justified center">
        <Image avatar src={ logo_image_path || logoPlaceholder } />
      </Table.Cell>
      <Table.Cell>{ orgName }</Table.Cell>
      <Table.Cell>{ name }</Table.Cell>
      <Table.Cell>{ address_city }</Table.Cell>
      <Table.Cell>{ `${ formatDate( start_date ) } - ${ formatDate( end_date ) }` }</Table.Cell>
      <Table.Cell>${cost_lowest} - ${cost_highest}</Table.Cell>
      <Table.Cell>
        <Link to={ `${ path }/${ id }/details` } >
          <Image src={ caretRight } />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

ProgramTableRow.defaultProps = {
  logo: logoPlaceholder,
  org_id: "Not Found",
  name: "Not Found",
  administrative_fee: "Not Found"
};

export default ProgramTableRow;

const formatDate = timestamp => {
  // let string = timestamp.split( " " )[0];
  let date = dateFromTimestamp( timestamp );
  return date.render();
};