import React from "react";
import { Icon, Segment } from "semantic-ui-react";

const CircularIcon = props => {

  return (
    <Segment compact circular className="cinch circular-icon">
      <Icon { ...props } />
    </Segment>
  );
};

export default CircularIcon;