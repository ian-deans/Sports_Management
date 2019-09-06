import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

const NavMenu = ( { match: { path }, location: { pathname } } ) => {
  const currentLocation = pathname.split( "/" ).pop();
  return (
    <Menu vertical className="nav-menu">
      <Menu.Item
        name="home"
        active={ currentLocation === "account" }
        link
        to={ path }
        as={ Link }
        className="nav-item"
      >
        <div>
          <Icon name="home" size="large" />
        </div>
        <div>
          <span>Home</span>
        </div>
      </Menu.Item>
      <Menu.Item
        name="household"
        active={ currentLocation === "household" }
        link
        to={ `${ path }/household` }
        as={ Link }
        className="nav-item"
      >
        <div>
          <Icon name="users" size="large" />
        </div>
        <div>
          <span>Household</span>
        </div>
      </Menu.Item>
      <Menu.Item
        name="financials"
        active={ currentLocation === "financials" }
        link
        to={ `${ path }/financials` }
        as={ Link }
        className="nav-item"
      >
        <div>
          <Icon name="dollar" size="large" />
        </div>
        <div>
          <span>Financials</span>
        </div>
      </Menu.Item>
      <Menu.Item
        name="documents"
        active={ currentLocation === "documents" }
        link
        to={ `${ path }/documents` }
        as={ Link }
        className="nav-item"
      >
        <div>
          <Icon name="file alternate" size="large" />
        </div>
        <div>
          <span>Documents</span>
        </div>
      </Menu.Item>
      <Menu.Item
        name="documents"
        active={ currentLocation === "programs" }
        link
        to={ `${ path }/programs` }
        as={ Link }
        className="nav-item"
      >
        <div>
          <Icon name="search" size="large" />
        </div>
        <div>
          <span>Programs</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};

export default withRouter( NavMenu );
