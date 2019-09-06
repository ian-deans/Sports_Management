import React from "react";
import { Panel } from "../../../../components/common";
import { BusinessDetailsContainer } from "./BusinessDetailsForm/BusinessDetailsContainer";
import { LogoUploadContainer } from "./LogoUpload/LogoUploadContainer";
import "./BusinessDetailsStation.less";

const BusinessDetailsStation = () => {
  return (
    <div className="business-details-station">
      <Panel.Group>
        <Panel.Header text={ "Business Details" } />
        <Panel.Item className="station-container">
          <div className="form-container-details">
            <BusinessDetailsContainer />
          </div>
          <div className="upload-container-logo">
            <LogoUploadContainer />
          </div>
        </Panel.Item>

      </Panel.Group>

    </div>
  );
};

export default BusinessDetailsStation;