import React from "react";
import { Button, Panel } from "../../../../components/common";
import { BankAccountsTableContainer } from "./BankAccountsTable/BankAccountsTableContainer";
import "./BankInformationStation.less";

const BankInformationStation = () => {
  return (
    <div className="administrators-station">
      <Panel.Group>
        <Panel.Header className="flexbox justified-space-between" text={ "Bank Accounts" }>
          <AddBankAccountButton />
        </Panel.Header>
        <Panel.Item className="station-container">
          <BankAccountsTableContainer />
        </Panel.Item>
      </Panel.Group>
    </div>
  );
};

export default BankInformationStation;

function AddBankAccountButton() {
  return (
    <a
      href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_6d2pbIRGi4TYev8xZ0G5giAEDaaLYhP9&scope=read_write&redirect_uri=http://cinch.test/stripe/connect/test"
    >
      <Button
        color="black"
      >
        Add Bank Account</Button>
    </a>
  );
}