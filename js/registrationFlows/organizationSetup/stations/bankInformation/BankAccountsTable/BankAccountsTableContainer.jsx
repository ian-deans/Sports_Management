import React from "react";
import { connect } from "react-redux";
import { BankAccountsTable } from "./BankAccountsTable";


const bankAccountsTableContainer = ( {
  // init,
  bankAccounts = {},
} ) => {

  const bankAccountList = Object.values( bankAccounts );

  return (
    <BankAccountsTable bankAccounts={ bankAccountList } />
  );
};

const mapStateToProps = ( { organizationSetup: { bankAccounts } } ) => ( {
  bankAccounts,
} );

const mapDispatchToProps = {};

export const BankAccountsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( bankAccountsTableContainer );
