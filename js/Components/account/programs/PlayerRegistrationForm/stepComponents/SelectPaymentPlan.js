import React from "react";
import { connect } from "react-redux";
import { Dropdown, Table } from "semantic-ui-react";
import { SmallSpinner, AvatarImage } from "../../../../common";
import ListItem from "../ListItem";

import { formatCurrency } from "../../../../../helpers/string";

import { getPaymentPlans, selectPaymentPlan } from "../../../../../actions/account/playerRegistration";

class SelectPaymentPlan extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.props.getPaymentPlans();
    this.setState( { loading: false } );
  };

  handleSelect = ( e, d ) => {
    this.props.selectPaymentPlan( d.value );
  }

  paymentPlans = () => {
    const { paymentPlans, paymentPlanId } = this.props;
    return paymentPlans.map( p => {
      const active = p.id === paymentPlanId;
      return (
        <ListItem key={p.id} active={active}>
          <span>{p.title}</span>
          <button onClick={() => this.handleSelect( p.id )}>Select</button>
        </ListItem>
      );
    } );
  };

  items = () => {
    //TODO add paymentPlanId to destructured arguments below
    const { player, division, paymentPlans } = this.props;
    const options = paymentPlans
      .map( pp => ( {key: pp.id, value: pp.id, text: pp.title} ) );
    return (
      <Table>
        <Table.Row>

          <Table.Cell>
            Org Logo
          </Table.Cell>

          <Table.Cell>
            Program Name
          </Table.Cell>

          <Table.Cell>
            {division.name}
          </Table.Cell>

          <Table.Cell>
            <span className="centered-box">
              <AvatarImage src={player.profile_image_path} />
              {player.full_name}
            </span>
          </Table.Cell>

          <Table.Cell>
            <Dropdown options={options} placeholder="Select Plan" onChange={this.handleSelect} />
          </Table.Cell>

          <Table.Cell>
            Admin Fee
          </Table.Cell>

          <Table.Cell>
            {formatCurrency( division.program_fee )}
          </Table.Cell>

        </Table.Row>
      </Table>
    );
  };

  render() {
    const items = this.items();
    return (
      <div>
        <h2>Select Payment Plan</h2>
        {this.state.loading ? <SmallSpinner /> : items}
      </div>
    );
  }
}

const mapStateToProps = state => ( {
  paymentPlans: state.account.playerRegistration.payment_plans,
  paymentPlanId: state.account.playerRegistration.payment_plan_id,
  player: state.account.playerRegistration.player,
  division: state.account.playerRegistration.division,
} );

const mapDispatchToProps = {
  getPaymentPlans,
  selectPaymentPlan,
};

export default connect( mapStateToProps, mapDispatchToProps )( SelectPaymentPlan );


/**
 * admin fee
 * total cost for division
 * player name
 * player avatar
 * organization logo
 * program name
 *
 */