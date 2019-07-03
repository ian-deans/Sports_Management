import React from "react";
import {
  Button,
  Container,
  Image,
  Header as SHeader,
  Segment
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getProgramById } from "../../../../actions/account";

import { Panel } from "../../../../Components/common";
import Moment from "../../../../util/Moment";
import { formatCurrency } from "../../../../utilities";
import { logoPath } from "../../../../constants/imagePaths";
const defaultLogo = logoPath + "arsenal-lg.png";

class ProgramDetails extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { programId }
      }
    } = this.props;
    if (programId) {
      this.props.getProgramById(programId);
    }
  }

  render() {
    const {
      id,
      name,
      description,
      administrative_fee,
      cost_lowest,
      cost_highest,
      start_date,
      end_date,
      match
    } = this.props;
    let logo, stateCode, city, orgName;
    if (this.props.organization) {
      logo = this.props.organization.data.logo_image_path;
      city = this.props.organization.data.address_city;
      stateCode = this.props.organization.data.address_state_code;
      orgName = this.props.organization.data.name;
    }

    const adminFee = administrative_fee ? formatCurrency(administrative_fee) : null;
    // organization: { data: { address_city, logo_image_path }},
    const path = formatPath(match.url);

    return (
      <Panel>
        <div className="page account-programs-details">

          <div className="area-header">
            <Header orgName={orgName} orgLogo={logo} programName={name} />
          </div>
          <div className="area-description">
            <Container text textAlign="center">
              <SubHeader text="Description" />
              <p className="description">{description}</p>
            </Container>
          </div>
          <div className="area-details">
            <Container>
              <Segment vertical padded>
                <SubHeader text="Dates" />
                {`${renderDate(start_date)} - ${renderDate(end_date)}`}
              </Segment>

              <Segment vertical padded>
                <SubHeader text="Ages" />
                {null}
              </Segment>

              <Segment vertical padded>
                <SubHeader text="Location" />
                {`${city}, ${stateCode}`}
              </Segment>

              <Segment vertical padded>
                <SubHeader text="Administrative Fee" />
                {adminFee}
              </Segment>
            </Container>
          </div>
          <div className="area-map">
            <Image
              style={{ margin: "auto" }}
              src="https://via.placeholder.com/300x300"
            />
          </div>
          <div className="area-buttons">
            <Button as={Link} to={path} color="black">
              Register
            </Button>
          </div>
        </div >
      </Panel>
    );
  }
}

const mapStateToProps = state => ({
  ...state.account.root.program_details
});

const mapDispatchToProps = {
  getProgramById
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProgramDetails)
);

const Header = ({ orgName, orgLogo, programName }) => (
  <SHeader as="h1" icon textAlign="center">
    <Image src={orgLogo ? orgLogo : defaultLogo} />
    <SHeader.Content>
      {orgName}
      <div>{programName}</div>
    </SHeader.Content>
  </SHeader>
);

const SubHeader = ({ floated, text }) => (
  <SHeader floated={floated ? floated : null} as="h5">
    {text}
  </SHeader>
);

const _location = location => {
  let arr = location.split("\n");

  return (
    <React.Fragment>
      <SubHeader text="Location" />
      <p>
        {arr[0]}
        <br />
        {arr[1]}
        <br />
        {arr[2]}
      </p>
    </React.Fragment>
  );
};

//NOTE: use while figuring out where the different pieces of data are coming from.
const renderData = data => {
  if (!data) {
    return "N/A";
  }
  return data;
};

const renderDate = rawDate => {
  if (!rawDate) {
    return "N/A";
  }
  let date = new Moment(rawDate, "YYYY-MM-DD");
  return date.render("M/DD/YYYY");
};

const formatPath = pathString => {
  if (!pathString) {
    throw new Error(
      "pathString not handed to utility function: formatPath: programDetails.js"
    );
  }
  let path = pathString.split("/");
  path.pop();
  path.push("register");
  path = path.join("/");
  return path;
};
