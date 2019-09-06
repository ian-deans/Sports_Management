import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, Image, Header } from "semantic-ui-react";
import { AvatarImage, Panel } from "..";
import { logout } from "../../../actions/app";
import {
  ACCOUNT_URL,
  HQ_URL,
  LOGOUT_URL,
} from "../../../config/urls";
import { iconPath, logoPath } from "../../../config/imagePaths";

const DEFAULT_AVATAR = iconPath + "avatar.png";
const DEFAULT_LOGO = logoPath + "cinch-lg.png";

const NavBar = ( {
  userAvatar,
  userName,
  orgLogo,
  orgName,
} ) => {

  const trigger = ( <Trigger
    avatar={ userAvatar || DEFAULT_AVATAR }
    user={ userName }
  /> );

  const logo = orgLogo || DEFAULT_LOGO;
  // const organizationName = orgName || "";

  return (
    <Panel
      className="cinch-navbar flexbox justified-space-between aligned-center"
    >
      <div className="flexbox aligned-center">
        <Image size="mini" src={ logo } className="icon" style={ spacing } />
        <Header as="h3">{ orgName }</Header>
      </div>

      <div className="flexbox">
        <Dropdown
          icon={ null }
          trigger={ trigger }
          pointing="top"
        >
          <Dropdown.Menu>
            <NavLinks org={ orgName } />
          </Dropdown.Menu>
        </Dropdown>
      </div>

    </Panel>
  );
};

const mapStateToProps = state => ( {
  accountContext: state.app.household_context,
  organizationContext: state.app.organization_context,
} );

const mapDispatchToProps = {
  logout,
};

export default connect( mapStateToProps, mapDispatchToProps )( NavBar );


const spacing = { marginRight: "2em" };

const NavLinks = ( { org } ) => {
  const links = new Map();
  links.set( "Account", ACCOUNT_URL );

  if ( org ) {
    links.set( "Organization HQ", HQ_URL );
  }

  links.set( "Logout", LOGOUT_URL );

  const items = [];

  links.forEach( ( url, label ) => {
    items.push(
      <Dropdown.Item key={ label } to={ url } as={ Link }>
        { label }
      </Dropdown.Item>
    );
  } );
  return items;
};

const Trigger = ( { user, avatar } ) => (
  <span className="flexbox aligned-center">
    <Header sub style={ spacing }>{ user }</Header>
    <AvatarImage src={ avatar } />
  </span>
);