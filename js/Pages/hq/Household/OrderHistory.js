import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Panel } from '../../../Components/common';

import PaymentMethodsTable from "../../../Components/hq/households/PaymentMethodsTable";
import OrdersTable from "../../../Components/hq/households/OrdersTable"

const OrderHistory = () => {
  return (
    <div className="page hq-family-order-histoy">
      <PaymentMethodsTable />
    </div>
  );
};


export default OrderHistory;