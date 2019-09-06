import React from "react";
import { Segment } from "semantic-ui-react";

const PlaceHolder = ( { message, className } ) => (
  <Segment placeholder textAlign="center" className={ className }>
    { message }
  </Segment>
);

export default PlaceHolder;