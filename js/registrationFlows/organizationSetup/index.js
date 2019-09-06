/**
 * Overarching container for the entire flow. This component
 * manages the currentStation value in state. It provides methods to increment
 * and decrement the value of currentStation as well as determines which station
 * to render based on its value. This component also determines completion status
 * of each station and passes resulting data to the OverView component.
 */
import React from "react";
import { connect } from "react-redux";
import { ErrorBoundary } from "../../components/common";
import { init, updateCurrentStation } from "../../redux/modules/organizationSetup/dispatchers";
import NavMenu from "./NavMenu/NavMenu";
import {
  AdministratorsStation,
  BankInformationStation,
  BusinessDetailsStation,
  LegalRepresentativeStation,
  ProofOfIdStation
} from "./stations";

import { dev } from "../../helpers/log";
class OrganizationSetupFlow extends React.Component {

  componentDidMount() {
    //? May need some sort of condition around this call?
    //? Or leave it all up to the dispatcher?
    this.props.init();
  }

  componentWillUnmount() {
    // this.props.resetAllForms();
  }

  getStationComponent = currentStation => {

    switch ( currentStation ) {
      case 0: {
        return () => <BusinessDetailsStation />;
      }

      case 1: {
        dev( LegalRepresentativeStation );
        return () => <LegalRepresentativeStation />;
      }

      case 2: {
        return () => <ProofOfIdStation />;
      }

      case 3: {
        return () => <BankInformationStation />;
      }

      case 4: {
        return () => <AdministratorsStation />;
      }

      default: {
        return null;
      }
    }
  };

  next = () => {
    const { currentStation } = this.props;
    if ( currentStation < 4 ) {
      this.props.updateCurrentStation( currentStation + 1 );
    }
  }

  prev = () => {
    const { currentStation } = this.props;
    if ( currentStation > 1 ) {
      this.props.updateCurrentStation( currentStation - 1 );
    }
  }

  render() {
    const { currentStation, updateCurrentStation, stationNames } = this.props;
    const Station = ( this.getStationComponent( currentStation ) );

    return (
      <ErrorBoundary>
        <div className="area-nav">
          <NavMenu
            current={ currentStation }
            setStation={ updateCurrentStation }
            stationNames={ stationNames }
          />
        </div>
        <div className="area-main">
          <Station />
          {/* <button onClick={ this.prev }>Back</button> */}
          {/* <button onClick={ this.next }>Next</button> */}
        </div>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => ( {
  currentStation: state.organizationSetup.currentStation,
  stationNames: state.organizationSetup.stationNames,
} );

const mapDispatchToProps = {
  init,
  updateCurrentStation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( OrganizationSetupFlow );