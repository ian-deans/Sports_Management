import React from "react";
import { Form } from "semantic-ui-react";
import { Panel } from "../../common";


const BankAccountForm = () => {
  return (
    <Panel.Group>
      <Panel.Header text="Bank Information" />
      <Panel.Item>
        <Form>
          <Form.Input />
        </Form>
      </Panel.Item>
    </Panel.Group>
  );
};

export default BankAccountForm;