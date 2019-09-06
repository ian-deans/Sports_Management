import React from "react";
import { Panel, Placeholder } from "../../common";


const UpcomingPayments = ( { payments = [] } ) => {
  const items = payments.length > 0
    ? payments.map( ( payment, i ) =>
      <div key={ i }>{ payment }</div> )
    : <Placeholder message="No upcoming payments" />;
  return (
    <Panel.Group>
      <Panel.Header text="Upcoming Payments" />
      { items }
    </Panel.Group>
  );
};

export default UpcomingPayments;
