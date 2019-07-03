import React from "react";
import { connect } from "react-redux";
import { SavedPaymentMethodsList } from "../../common";

const SavedPaymentMethods = ({ paymentMethods }) => {
  return (
    <SavedPaymentMethodsList
      paymentMethods={paymentMethods}
    />
  )
}

const mapStateToProps = state => ({
  paymentMethods: state.account.root.payment_methods
});

export default connect(mapStateToProps)(SavedPaymentMethods);

