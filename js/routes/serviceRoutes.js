/* eslint-disable camelcase */
import React from "react";
import { Redirect } from "react-route-dom";
import API from "../api/Api";


export function stripeAddBankAccountHandler( props ) {
  const query = new URLSearchParams( props.location.search );
  const code = query.get( "code" );
  localStorage.setItem( "stripe_newBankAccountCode", code );

  API.organizationSetup
    .addBankAccount( { authorization_code: code, is_default: true } );
  return <Redirect to="/app/hq/setup/" />;
}

