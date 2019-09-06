import React from "react";
import { connect } from "react-redux";
import { TableContained } from "../../common";

const headerItems = ["Payment Methods"];
const columnData = new Map( [
  ["Cardholder Name", "customer_name"],
  ["Card Type", "card_brand"],
  ["Last 4 Digits", "last4"],
  ["Expiration Month", "expiration_month"],
  ["Expiration Year", "expiration_year"]
] );

const PaymentMethodsTable = ( {paymentMethods} ) => {

  return (
    <TableContained
      header={headerItems}
      columns={columnData}
      rowData={paymentMethods}
    />
  );
};

const mapStateToProps = state => ( {
  paymentMethods: state.hq.households.payment_methods,
} );

export default connect( mapStateToProps )( PaymentMethodsTable );