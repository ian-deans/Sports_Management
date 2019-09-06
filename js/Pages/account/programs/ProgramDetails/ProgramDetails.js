/* eslint-disable camelcase */
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
import { Panel } from "../../../../components/common";
import { getProgramById } from "../../../../actions/account";
import { formatCurrency } from "../../../../helpers/string";
import { dateFromYYYYMMDD } from "../../../../helpers/date";
import { logoPath } from "../../../../config/imagePaths";

const defaultLogo = logoPath + "arsenal-lg.png";

class ProgramDetails extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { programId }
      }
    } = this.props;
    if ( programId ) {
      this.props.getProgramById( programId );
    }
  }

  render() {
    const {
      // id, //!FIXME unused variable
      name,
      description,
      administrative_fee,
      // cost_lowest, //!FIXME unused variable
      // cost_highest, //!FIXME unused variable
      start_date,
      end_date,
      match
    } = this.props;
    let logo, stateCode, city, orgName;
    if ( this.props.organization ) {
      logo = this.props.organization.data.logo_image_path;
      city = this.props.organization.data.address_city;
      stateCode = this.props.organization.data.address_state_code;
      orgName = this.props.organization.data.name;
    }

    const adminFee = administrative_fee ? formatCurrency( administrative_fee ) : null;
    const path = formatPath( match.url );

    return (
      <Panel>
        <div className="page account-programs-details">

          <div className="area-header">
            <Header orgName={ orgName } orgLogo={ logo } programName={ name } />
          </div>
          <div className="area-description">
            <Container text textAlign="center">
              <SubHeader text="Description" />
              <p className="description">{ description }</p>
            </Container>
          </div>
          <div className="area-details">
            <Container>
              <Segment vertical padded>
                <SubHeader text="Dates" />
                { `${ renderDate( start_date ) } - ${ renderDate( end_date ) }` }
              </Segment>

              <Segment vertical padded>
                <SubHeader text="Ages" />
                { null }
              </Segment>

              <Segment vertical padded>
                <SubHeader text="Location" />
                { `${ city }, ${ stateCode }` }
              </Segment>

              <Segment vertical padded>
                <SubHeader text="Administrative Fee" />
                { adminFee }
              </Segment>
            </Container>
          </div>
          <div className="area-map">
            <Image
              style={ { margin: "auto" } }
              src="https://via.placeholder.com/300x300"
            />
          </div>
          <div className="area-buttons">
            <Button as={ Link } to={ path } color="black">
              Register
            </Button>
          </div>
        </div >
      </Panel>
    );
  }
}

const mapStateToProps = state => ( {
  ...state.account.root.program_details
} );

const mapDispatchToProps = {
  getProgramById
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )( ProgramDetails )
);

const Header = ( { orgName, orgLogo, programName } ) => (
  <SHeader as="h1" icon textAlign="center">
    <Image src={ orgLogo ? orgLogo : defaultLogo } />
    <SHeader.Content>
      { orgName }
      <div>{ programName }</div>
    </SHeader.Content>
  </SHeader>
);

const SubHeader = ( { floated, text } ) => (
  <SHeader floated={ floated ? floated : null } as="h5">
    { text }
  </SHeader>
);

// const _location = location => { //!FIXME unused variable
//   let arr = location.split( "\n" );

//   return (
//     <React.Fragment>
//       <SubHeader text="Location" />
//       <p>
//         { arr[ 0 ] }
//         <br />
//         { arr[ 1 ] }
//         <br />
//         { arr[ 2 ] }
//       </p>
//     </React.Fragment>
//   );
// };

//NOTE: use while figuring out where the different pieces of data are coming from.
// const renderData = data => {  //!FIXME unused variable
//   if ( !data ) {
//     return "N/A";
//   }
//   return data;
// };

const renderDate = rawDate => {
  if ( !rawDate ) {
    return "N/A";
  }
  const date = dateFromYYYYMMDD( rawDate );
  return date.render( "M/DD/YYYY" );
};

const formatPath = pathString => {
  if ( !pathString ) {
    throw new Error(
      "pathString not handed to utility function: formatPath: programDetails.js"
    );
  }
  let path = pathString.split( "/" );
  path.pop();
  path.push( "register" );
  path = path.join( "/" );
  return path;
};
