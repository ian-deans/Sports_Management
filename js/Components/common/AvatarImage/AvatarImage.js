import React from "react";
import { Image } from "semantic-ui-react";

const defaultImagePath = "images/icons/avatar.png";

const AvatarImage = ( { src = defaultImagePath } ) => {
  return <Image avatar src={ src } />;
};

export default AvatarImage;
