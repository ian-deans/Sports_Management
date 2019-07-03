import React from "react";
import { Image } from "semantic-ui-react";

const AvatarImage = props => {
  let { src } = props;
  if (!src) {
    src = "/images/icons/avatar.png";
  }

  return (
    <Image avatar src={src} />
  )
};

export default AvatarImage;