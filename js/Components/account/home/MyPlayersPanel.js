import React from "react";
import { Segment, Header } from "semantic-ui-react";

const MyPlayersPanel = props => {

  if ( props.show ) {
    return (
      <Segment vertical>
        <Header as="h5">My Players</Header>
      </Segment>
    );
  }

  return null;

};

export default MyPlayersPanel;