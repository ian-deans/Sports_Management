import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { Panel } from "../../common";

const GeneralInfo = ({ info }) => {
  return (
    <Panel>
      <Panel.Header text="General Information" />
      <Panel.Item>
        <Grid.Row columns="equal">
          <Grid.Column>{info.name || "Family Name"}</Grid.Column>
        </Grid.Row>
      </Panel.Item>

      <Panel.Item>
        <span className="flexbox justified-center aligned-center">
          {info.address_street1},
            {info.adress_street2}
          <br />
          {info.address_city}, {info.address_state_code}
          <br />
          {info.address_zip}
        </span>
      </Panel.Item>
    </Panel>
  );
};

const mapStateToProps = state => ({
  info: state.hq.households.info,
});

export default connect(mapStateToProps)(GeneralInfo);