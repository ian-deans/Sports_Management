/* eslint-disable camelcase */
import React from "react";
import { connect } from "react-redux";
import { Button, SmallSpinner } from "../../../../common";
import { getEligibleDivisions, confirmDivision } from "../../../../../actions/account/playerRegistration";
import { Table } from "semantic-ui-react";
// import { formatCurrency } from "../../../../../helpers"; //? Looking into using root folders like below
import { formatCurrency } from "../../../../../helpers/string";


class ConfirmDivision extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.props.getEligibleDivisions();
    this.setState( { loading: false } );
  };

  handleConfirmDivision = id => {
    this.props.confirmDivision( id );
  };

  divisions = () => {
    const { divisions, division_id } = this.props;
    const rows= divisions.map( d => {
      const active = d.id === division_id;
      return (
        <Table.Row key={d.id} active={active}>
          <Table.Cell>{d.name}</Table.Cell>
          <Table.Cell>{d.gender}</Table.Cell>
          <Table.Cell>{formatCurrency( d.program_fee )}</Table.Cell>
          <Button color="black" size="tiny" onClick={() => this.handleConfirmDivision( d.id )}>Confirm</Button>
        </Table.Row>
      );
    } );

    return (
      <Table padded="very">
        <Table.Body>
          {rows}
        </Table.Body>
      </Table>

    );
  };

  render() {
    const divisions = this.divisions();
    return (
      <div>
        <h2>Divisions</h2>
        {this.state.loading ? <SmallSpinner /> : divisions}
      </div>
    );

  }
}

const mapStateToProps = state => ( {
  divisions: state.account.playerRegistration.divisions,
  division_id: state.account.playerRegistration.division_id,
} );

const mapDispatchToProps = {
  getEligibleDivisions,
  confirmDivision,
};

export default connect( mapStateToProps, mapDispatchToProps )( ConfirmDivision );
