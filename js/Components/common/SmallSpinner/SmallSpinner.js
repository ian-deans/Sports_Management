import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const SmallSpinner = () => (
  <Segment>
    <Dimmer inverted active>
      <Loader active inverted content={ "Loading..." } />
    </Dimmer>
  </Segment>
);

export default SmallSpinner;