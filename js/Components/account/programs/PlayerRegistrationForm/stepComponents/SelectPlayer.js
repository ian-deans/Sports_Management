import React from "react";
import { connect } from "react-redux";
import { getEligiblePlayers, selectPlayer } from "../../../../../actions/account/playerRegistration";
import { Table } from "semantic-ui-react";
import { AvatarImage, Button, SmallSpinner } from "../../../../common";

// import ListItem from "../ListItem";


/**
 * on load dispatch action to get eligible players
 * render a table of players for user to select from
 */

class SelectPlayer extends React.Component {

  state = {
    loading: true,
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.props.getEligiblePlayers();
    this.setState( { loading: false } );
  }

  handleSelectPlayer = id => {
    this.props.selectPlayer( id );
  }

  players = () => {
    const { players, personId } = this.props;
    const rows = players.map( ( p ) => {
      const active = p.id === personId;
      return (
        <Table.Row key={p.id} active={active}>
          <Table.Cell>
            <AvatarImage src={p.profile_image_path} />
          </Table.Cell>
          <Table.Cell>
            {p.full_name}
          </Table.Cell>
          <Table.Cell>
            {p.birthdate}
          </Table.Cell>
          <Table.Cell>
            {p.gender}
          </Table.Cell>
          <Table.Cell textAlign="center">
            <Button color="black" size="tiny" onClick={() => this.handleSelectPlayer( p.id )}>Select</Button>
          </Table.Cell>
        </Table.Row>
      );
    } );
    return (
      <Table textAlign="center" verticalAlign="middle">
        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    );
  }

  render() {
    const players = this.players();
    return (
      <div className="flexbox column aligned-flex-start justified-center">
        <h2>Eligible Players</h2>
        {this.state.loading ? <div><SmallSpinner /></div> : players}
      </div>
    );
  }
}

const mapStateToProps = state => ( {
  players: state.account.playerRegistration.players,
  personId: state.account.playerRegistration.person_id,
} );

const mapDispatchToProps = {
  getEligiblePlayers,
  selectPlayer,
};

export default connect( mapStateToProps, mapDispatchToProps )( SelectPlayer );