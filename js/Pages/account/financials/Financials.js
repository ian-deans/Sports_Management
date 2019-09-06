import React from "react";
import { NewPaymentMethod, SavedPaymentMethods } from "../../../components/account/financials";
import { PaymentHistory } from "../../../components/account/financials";
import "./Financials.less";

const Financials = () => {
  return (
    <div className="page account-financials">
      <div className="area-new-card">
        <NewPaymentMethod />
      </div>
      <div className="area-saved-cards">
        <SavedPaymentMethods />
      </div>
      <div className="area-order-history">
        <PaymentHistory />
      </div>
    </div>
  );
};

export default Financials;