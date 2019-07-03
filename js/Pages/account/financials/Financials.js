import React from 'react';
import { NewPaymentMethod, SavedPaymentMethods } from "../../../Components/account/financials";
import { PaymentHistory } from '../../../Components/account/financials';

const Financials = props => {
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