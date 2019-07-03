import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Image,
} from "semantic-ui-react";
import { Panel } from '../../common';
import { iconPath } from "../../../constants/imagePaths";

const playerIcon = iconPath + "add_user.png";
const teamIcon = iconPath + "users.png";
const organizationIcon = iconPath + "globe.png"
const arrowIcon = iconPath + "circle_arrow.png";


const ArrowButton = () => (
  <Image src={ arrowIcon } />
);

const QuickLink = ({ path, name, image }) => (
  <Panel.Item
    as={ Link }
    to={ `${path}` }
    className="quick-add-link"
  >
    <div className="flexbox aligned-center">
      <Image src={ image } />
      { name }
    </div>
    <ArrowButton />
  </Panel.Item>
);

const QuickAddMenu = ({ path }) => {
  return (
    <Panel.Group className="quick-add-panel">
      <Panel.Header text="Add New" />
      <QuickLink
        name="Player"
        path={ path }
        image={ playerIcon }
      />
      <QuickLink
        name="Team"
        path={ path }
        image={ teamIcon }
      />
      <QuickLink
        name="Organization"
        path={ `/app/new-organization` }
        image={ organizationIcon }
      />
    </Panel.Group>
  );
};

export default withRouter(QuickAddMenu);
