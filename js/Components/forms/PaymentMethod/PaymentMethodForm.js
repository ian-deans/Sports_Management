import React from 'react';
import { Form } from 'semantic-ui-react';
import { Button, Input, Panel } from '../../common';
import { STRIPE_DEV_KEY } from "../../../config/keys";

//TODO: throw/log error if no stripe_key envrionment variable can be found
// const STRIPE_KEY = process.env.STRIPE_API_SECRET || "pk_test_r35puzPtCAZLLpApaXVMPzum";

class PaymentMethodForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: "",
      loading: false,
    };
    this.stripe = window.Stripe(STRIPE_DEV_KEY);
    this.elements = this.stripe.elements();
    this.card = this.elements.create("card");
  }

  componentDidMount() {
    this.card.mount("#stripe-card-element");
  }

  handleChange = (event, data) => {
    this.setState({ [data.name]: data.value });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true })
    const { customer_name } = this.state;
    const result = await this.stripe.createToken(this.card, { customer_name });

    if (result.error) {
      this.setState({ loading: false })
      console.error(result.error);

    } else {
      const token = result.token;
      const data = {
        data: {
          processor_token_id: token.id,
          is_default: true,
        }
      }

      this.props.save(data);
      this.card.clear();
      this.setState({ loading: false });
    }
  }

  render() {
    const { customer_name, loading } = this.state;
    return (
      <Panel className="component-account-financials-new-card">

        <Form
          className="save-new-payment-card-form"
          onSubmit={this.handleSubmit}
        >
          <Form.Field>
            <label>
              Cardholder Name
          </label>
            <Input name="customer_name" onChange={this.handleChange} value={customer_name} />
          </Form.Field>
          <Form.Field id="stripe-card-container">
            <label htmlFor="stripe-card-element">Card Information</label>
            <div id="stripe-card-element" className="">

            </div>
          </Form.Field>
          <Button
            type="submit"
            disabled={loading}
            className={loading ? "loading" : ""}
          >
            Submit
        </Button>

        </Form>
      </Panel>
    );
  }
};

export default PaymentMethodForm;
