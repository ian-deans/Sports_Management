import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { clearSearchResults } from "../../../actions/account";
import { Placeholder } from "../../../components/common";
import ProgramsTable from "./ProgramsTable/ProgramsTable";

class ProgramSearchResults extends React.Component {

  componentWillUnmount() {
    this.props.clearSearchResults();
  }

  render() {
    const { programs, match: { path } } = this.props;
    if ( !programs.length ) {
      return (
        <div className="page account-program-search-results">
          <Placeholder message="No programs matching criteria found." />
        </div>

      );
    }
    return (
      <div className="page account-program-search-results">
        <ProgramsTable programs={programs} path={path} />
      </div>
    );
  }
}

const mapStateToProps = state => ( {
  programs: state.account.root.program_search_results,
} );

export default withRouter( connect(
  mapStateToProps, { clearSearchResults }
)( ProgramSearchResults ) );