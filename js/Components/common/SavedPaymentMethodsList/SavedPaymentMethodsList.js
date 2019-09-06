/* eslint-disable camelcase */
import React from "react";
import { Icon, Radio } from "semantic-ui-react";
import { Button, Placeholder, Panel } from "..";
import cardBrands from "../../../config/creditCardBrands";


const SavedPaymentMethod = ( { card_brand, customer_name, last4 } ) => {
  const icon = card_brand ? cardBrands[ card_brand ] : "";
  const classes = [
    "full-width",
    "flexbox",
    "aligned-center",
    "justified-space-between",
    "component-saved-payment-methods-list"
  ];
  const width = { width: "25%", marginBottom: "1em" };
  return (
    <div className={ classes.join( " " ) }>
      <span style={ width }>
        <Radio name="selected_method" />
      </span>
      <span style={ width }>
        <Icon name={ "cc" + icon } size="large" />
      </span>
      <span style={ width }>
        { customer_name }
      </span>
      <span style={ width }>
        { last4 }
      </span>
    </div>
  );
};

const SavedPaymentMethodsList = ( { paymentMethods } ) => {
  let items;
  let disableButton = true;

  if ( paymentMethods ) {
    items = paymentMethods.map( createSavedPaymentMethodComponent );
  } else {
    items = (
      <Placeholder
        key={ 0 }
        message="No Saved Cards"
        className="saved-payment-cards-list"
      />
    );
    disableButton = false;
  }

  const panelClasses = [
    "flexbox",
    "column",
    "aligned-center",
    "justified-space-around"
  ].join( " " );

  const divClasses = [
    "full-width",
    "flexbox", "column",
    "aligned-center",
    "justified-center"
  ].join( " " );

  return (
    <div className="component-account-saved-payment-methods">
      <Panel className={ panelClasses }>
        <div className={ divClasses }>
          { items }
        </div>
        <div className="flexbox justified-center">
          <Button disabled={ disableButton }>Save as Default</Button>
        </div>
      </Panel>
    </div>
  );
};

export default SavedPaymentMethodsList;

function createSavedPaymentMethodComponent( method, i ) {
  return <SavedPaymentMethod key={ i } { ...method } />;
}
