import React from "react";
import { Step } from "semantic-ui-react";
import { Panel } from "../../../common";

const StepIndicator = ( { currentStep } ) => {
  return (
    <Panel>
      <Step.Group
        size="mini"
        fluid
        ordered
      >

        <Step completed={ currentStep > 1 } active={ currentStep === 1 } disabled={ currentStep < 1 }>
          <Step.Content>
            <Step.Title>Player</Step.Title>
          </Step.Content>
        </Step>

        <Step completed={ currentStep > 2 } active={ currentStep === 2 } disabled={ currentStep < 2 }>
          <Step.Content>
            <Step.Title>Division</Step.Title>
          </Step.Content>
        </Step>

        <Step completed={ currentStep > 3 } active={ currentStep === 3 } disabled={ currentStep < 3 }>
          <Step.Content>
            <Step.Title>Questions</Step.Title>
          </Step.Content>
        </Step>

        <Step completed={ currentStep > 4 } active={ currentStep === 4 } disabled={ currentStep < 4 }>
          <Step.Content>
            <Step.Title>Documents</Step.Title>
          </Step.Content>
        </Step>

        <Step completed={ currentStep > 5 } active={ currentStep === 5 } disabled={ currentStep < 5 }>
          <Step.Content>
            <Step.Title>Payment Plan</Step.Title>
          </Step.Content>
        </Step>

        <Step completed={ currentStep > 6 } active={ currentStep === 6 } disabled={ currentStep < 6 }>
          <Step.Content>
            <Step.Title>Payment Method</Step.Title>
          </Step.Content>
        </Step>

        <Step completed={ currentStep > 7 } active={ currentStep === 7 } disabled={ currentStep < 7 }>
          <Step.Content>
            <Step.Title>Review</Step.Title>
          </Step.Content>
        </Step>

      </Step.Group>
    </Panel>
  );
};

export default StepIndicator;