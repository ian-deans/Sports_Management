import React from "react";
import { Table } from "semantic-ui-react";

//FIXME: remove style objects

export default props => (
  <Table.Row style={ { height: "4em", width: "100%" } }>
    { props.children }
  </Table.Row>
);