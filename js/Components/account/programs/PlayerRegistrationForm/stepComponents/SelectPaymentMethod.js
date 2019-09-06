/* eslint-disable camelcase */
import React from "react";
import { connect } from "react-redux";
import { Dropdown, Table } from "semantic-ui-react";
import { Panel, SmallSpinner } from "../../../../common";
import { formatCurrency } from "../../../../../helpers/string";

import { dev } from "../../../../../helpers/log";

import {
  selectPaymentMethod,
  prepareCart,
  removeCartItem,
} from "../../../../../actions/account/playerRegistration";

class SelectPaymentMethod extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.props.prepareCart();
    this.setState( { loading: false } );
  };

  handleSelect = ( e, d ) => {
    this.props.selectPaymentMethod( d.value );
  };

  handleRemoveCartItem = id => {
    dev( "Remove item from cart with id ", id );
    this.props.removeCartItem( id );
  }

  paymentMethods = () => {
    const { paymentMethods } = this.props;
    return paymentMethods.map( p => ( {
      key: p.id, value: p.id, text: `${ p.card_brand } ${ p.last4 }`,
    } ) );
  }

  selectMethodRow = () => {
    const paymentOptions = this.paymentMethods();
    const { paymentMethodId } = this.props;
    return (
      <Table.Row>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell>Payment Method</Table.Cell>
        <Table.Cell>
          <Dropdown
            value={ paymentMethodId }
            options={ paymentOptions }
            onChange={ this.handleSelect }
          />
        </Table.Cell>
        <Table.Cell />
      </Table.Row>
    );
  }

  cartItems = () => {
    const { cart } = this.props;
    if ( !cart ) {
      return;
    }
    return cart.cart_items.data.map( item => {
      return (
        <Table.Row key={ item.id }>
          <Table.Cell />
          <Table.Cell />
          <Table.Cell>Due Today: { formatCurrency( item.deposit_amount ) }</Table.Cell>
          <Table.Cell />
          <Table.Cell>Total: { formatCurrency( item.total_amount ) }</Table.Cell>
          <Table.Cell>
            <button onClick={ () => this.handleRemoveCartItem( item.id ) }>Remove</button>
          </Table.Cell>
        </Table.Row>
      );
    } );
  };

  costRow = () => {
    const { cart } = this.props;
    if ( !cart ) {
      return;
    }

    return (
      <Table.Row>
        <Table.Cell />
        <Table.Cell />
        <Table.Cell />
        <Table.Cell>
          Due Now:
        </Table.Cell>
        <Table.Cell>
          <h2>{ formatCurrency( cart.total_amount ) }</h2>
        </Table.Cell>
        <Table.Cell />
      </Table.Row>
    );
  }

  render() {
    const items = this.cartItems();
    const costRow = this.costRow();
    const selectMethodRow = this.selectMethodRow();
    return (
      <Panel>
        <h2>Review and Select Payment Method</h2>
        { this.state.loading ? <SmallSpinner /> : (

          <Table>
            <Table.Body>
              { items }
              { selectMethodRow }
              { costRow }
            </Table.Body>
          </Table>
        ) }
      </Panel>

    );
  }
}

const mapStateToProps = ( { account } ) => ( {
  paymentMethods: account.root.payment_methods,
  paymentMethodId: account.playerRegistration.payment_method_id,
  player: account.playerRegistration.player,
  cart: account.playerRegistration.cart,
} );

const mapDispatchToProps = {
  prepareCart,
  selectPaymentMethod,
  removeCartItem,
};

export default connect( mapStateToProps, mapDispatchToProps )( SelectPaymentMethod );