import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Image, Icon, Popup } from "semantic-ui-react";
import { iconPath, logoPath } from "../../config/imagePaths";
import { getLastPathFromUrl } from "../../helpers/string";

import { ErrorBoundary, PageNotFound, Panel } from "../../components/common";
import HomeDashboard from "./Home/HomeDashboard";
import Programs from "./Programs/Programs";
import Households from "./Household/Household";
import Registrations from "./Registrations/Registrations";
import OrganizationSetup from "./Setup/Setup";

import {
  HQ_URL,
  HQ_PROGRAMS_URL,
  HQ_HOUSEHOLDS_URL,
  HQ_REGISTRATIONS_URL,
} from "../../config/urls";

import "./Hq.less";

const cinchLogo = logoPath + "cinch-sm.png";
const hamburgerIcon = iconPath + "hamburger.png";

const Hq = props => {

  const {
    location: {
      pathname
    },
    match: { path }
  } = props;
  const currentLocation = getLastPathFromUrl( pathname ); //TODO: abstract to a helper function. endOfUrl() or something.

  return (
    <div className="section hq">
      <SideBar currentLocation={ currentLocation } fullpath={ pathname } path={ path } />
      <div className="main">
        <ErrorBoundary>
          <Switch>
            <Route exact path={ HQ_URL } component={ HomeDashboard } />
            <Route path={ HQ_PROGRAMS_URL } component={ Programs } />
            <Route path={ HQ_HOUSEHOLDS_URL } component={ Households } />
            <Route path={ HQ_REGISTRATIONS_URL } component={ Registrations } />
            <Route path={ "/app/hq/setup/" } component={ OrganizationSetup } />
            <Route path={ "/app/hq/setup/new_bank_account/:code" } component={ OrganizationSetup } />
            <Route component={ PageNotFound } />`
          </Switch>
        </ErrorBoundary>
      </div>

    </div>

  );

};


const SideBar = ( { fullpath, path, currentLocation } ) => {
  return (
    <Panel className="buffer-bottom hq-sidebar">
      <ImageItem imageSource={ cinchLogo } />
      <ImageItem imageSource={ hamburgerIcon } />
      <LinkItem
        active={ currentLocation === "hq" }
        path={ path }
        name="home"
        label="Home"
      />
      <LinkItem
        active={ currentLocation === "programs" }
        path={ path + "/programs" }
        name="globe"
        label="Programs"
      />
      <LinkItem
        active={ isHouseholds( currentLocation ) }
        path={ path + "/households" }
        name="user"
        label="Households"
      />
      <LinkItem
        active={ currentLocation === "registrations" }
        path={ path + "/registrations" }
        name="dollar"
        label="Registrations"
      />
      <LinkItem
        active={ inSetup( fullpath ) }
        path={ path + "/setup" }
        name="setting"
        label="Setup"
      />
    </Panel>
  );
};

const ImageItem = ( { imageSource } ) => {
  return (
    <div className="sidebar-link">
      <Image src={ imageSource } />
    </div>
  );
};

const LinkItem = ( { active, label, name, path } ) => {
  return (
    <div className="sidebar-link">
      <Popup
        trigger={
          <Link to={ path }>
            <Icon name={ name } size="big" color={ active ? "blue" : "grey" } />
          </Link>
        }
        content={ label }
        position="right center"
      />
    </div>
  );
};


export default Hq;

const isHouseholds = location =>
  location === "households" || location === "order-history" || location === "documents";

const inSetup = pathname => pathname.split( "/" ).includes( "setup" );
