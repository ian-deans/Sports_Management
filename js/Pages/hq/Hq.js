import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Image, Icon, Popup } from "semantic-ui-react";
import { iconPath, logoPath } from "../../constants/imagePaths";
import { lastInPath } from "../../utilities";

import { ErrorBoundary, PageNotFound, Panel } from "../../Components/common";
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
  HQ_SETUP_URL
} from "../../config/urls";

const cinchLogo = logoPath + "cinch-sm.png";
const hamburgerIcon = iconPath + "hamburger.png";

class Hq extends React.Component {

  render() {
    const {
      location: {
        pathname
      },
      match: { path }
    } = this.props;
    const currentLocation = lastInPath(pathname);
    
    return (
      <div className="section hq">
        <Hq.SideBar currentLocation={currentLocation} fullpath={pathname} path={path} />
        <div className="main">
          <ErrorBoundary>
            <Switch>
              <Route exact path={HQ_URL} component={HomeDashboard} />
              <Route path={HQ_PROGRAMS_URL} component={Programs} />
              <Route path={HQ_HOUSEHOLDS_URL} component={Households} />
              <Route path={HQ_REGISTRATIONS_URL} component={Registrations} />
              <Route path={HQ_SETUP_URL} component={OrganizationSetup} />
              <Route component={PageNotFound} />`
            </Switch>
          </ErrorBoundary>
        </div>

      </div>

    )

  }

  static SideBar({ fullpath, path, currentLocation }) {
    return (
      <Panel className="buffer-bottom hq-sidebar">
        <Hq.ImageItem imageSource={cinchLogo} />
        <Hq.ImageItem imageSource={hamburgerIcon} />
        <Hq.LinkItem
          active={currentLocation === "hq"}
          path={path}
          name="home"
          label="Home"
        />
        <Hq.LinkItem
          active={currentLocation === "programs"}
          path={path + "/programs"}
          name="globe"
          label="Programs"
        />
        <Hq.LinkItem
          active={isHouseholds(currentLocation)}
          path={path + "/households"}
          name="user"
          label="Households"
        />
        <Hq.LinkItem
          active={currentLocation === "registrations"}
          path={path + "/registrations"}
          name="dollar"
          label="Registrations"
        />
        <Hq.LinkItem
          active={inSetup(fullpath)}
          path={path + "/setup/business-details"}
          name="setting"
          label="Setup"
        />
      </Panel>
    );
  }

  static ImageItem({ imageSource }) {
    return (
      <div className="sidebar-link">
        <Image src={imageSource} />
      </div>
    );
  }

  static LinkItem({ active, label, name, path }) {
    return (
      <div className="sidebar-link">
        <Popup 
          trigger={
            <Link to={path}>
              <Icon name={name} size="big" color={active ? "blue" : "grey"} />
            </Link>
          }
          content={label}
          position="right center"
        />
      </div>
    );
  }
}

export default Hq;

const isHouseholds = location =>
  location === "households" || location === "order-history" || location === "documents";

const inSetup = pathname => pathname.split("/").includes("setup"); 
