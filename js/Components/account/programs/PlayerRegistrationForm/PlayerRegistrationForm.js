/* eslint-disable camelcase */
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { Panel } from "../../../common";

import { initPlayerRegistration } from "../../../../actions/account/playerRegistration";
import StepIndicator from "./StepIndicator";
import * as views from "./stepComponents/index";

function isValid( value ) {
  return value !== null && value !== undefined;
}


const steps = [
  {
    component: () => null,
  },
  {
    component: () => <views.SelectPlayer />,
    isComplete: ( { person_id } ) => isValid( person_id ),
  },
  {
    component: () => <views.ConfirmDivision />,
    isComplete: ( { division_id } ) => isValid( division_id ),
  },
  {
    component: () => <views.AnswerQuestions />,
    isComplete: ( { division_id } ) => isValid( division_id ),
  },
  {
    component: () => <views.UploadDocuments />,
    isComplete: ( { division_id } ) => isValid( division_id ),
  },
  {
    component: () => <views.SelectPaymentPlan />,
    isComplete: ( { payment_plan_id } ) => isValid( payment_plan_id ),
  },
  {
    component: () => <views.SelectPaymentMethod />,
    isComplete: ( { payment_method_id } ) => isValid( payment_method_id ),
  },
  {
    component: () => <views.Review />,
    isComplete: ( { division_id } ) => isValid( division_id ),
  },
];


class PlayerRegistrationForm extends React.Component {

  state = {
    currentStep: 0,
    error: "",
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const { match: { params: { programId } } } = this.props;
    await this.props.initPlayerRegistration( programId );
    this.setState( { currentStep: 1 } );
  }

  next = () => {
    const { currentStep } = this.state;
    if ( this.stepIsComplete() && currentStep < 7 ) {
      let currentStep = ++this.state.currentStep;
      this.setState( { currentStep, error: "" } );
    } else {
      this.setState( { error: "Current step is not completed." } );
    }
  };

  stepIsComplete = () => {
    const { currentStep } = this.state;
    if ( currentStep > 0 ) {
      return steps[currentStep].isComplete( this.props.formState );
    }
  }

  prev = () => {
    let { currentStep } = this.state;
    if ( currentStep > 1 ) {
      currentStep--;
      this.setState( { currentStep } );
    }
  }


  render() {
    const { currentStep } = this.state;
    const disabled = ( currentStep > 6 || !this.stepIsComplete() );

    return (
      <div className="page account-programs-register">
        <div name="area-step-indicator centered-box">
          <StepIndicator currentStep={currentStep} />
        </div>

        <div name="area-main">
          {steps[currentStep].component()}
        </div>

        <Panel name="area-navigation">
          <div className="flexbox column aligned-center justified-center">
            {this.state.error}
            <Button.Group size="large">
              <Button
                compact
                onClick={this.prev}
              >
                Previous
              </Button>
              <Button
                color="black"
                compact
                disabled={disabled}
                onClick={this.next}
              >
                Next
              </Button>
            </Button.Group>
          </div>

        </Panel>

      </div>
    );
  }
}

const mapStateToProps = state => ( {
  formState: state.account.playerRegistration,
} );

const mapDispatchToProps = {
  initPlayerRegistration,
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( PlayerRegistrationForm ) );
