import React from "react";
import { connect } from "react-redux";
import { saveNewPaymentMethod } from "../../../actions/account";
import { PaymentMethodForm } from "../../forms";

const NewPaymentMethod = ( { saveNewPaymentMethod } ) => {
  return (
    <PaymentMethodForm
      save={ saveNewPaymentMethod }
    />
  );
};

const mapStateToProps = () => ( {} );

const mapDispatchToProps = {
  saveNewPaymentMethod
};

export default connect( mapStateToProps, mapDispatchToProps )( NewPaymentMethod );