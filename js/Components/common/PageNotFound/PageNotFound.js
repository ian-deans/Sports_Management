import React from "react";
import { Icon } from "semantic-ui-react";

const PageNotFound = props => (
  <div className="cinch-404-error">
    <h1><Icon name="exclamation circle" /> Not Found!</h1>
    <h5>{ props.location.pathname }</h5>
    <p>
      Sorry but the page at the requested address does not exist.
    </p>
  </div>
);

PageNotFound.defaultProps = {
  location: "No location prop passed to component"
};

export default PageNotFound;