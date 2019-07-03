import React from "react";
import { Icon, Step } from 'semantic-ui-react';
import { Link } from "react-router-dom";

const StepIcon = () => (<Icon name="dot circle outline" color="red" />);

const views = [
  "business-details", 
  "legal-representative",
  "proof-of-id",
  "bank-information",
  // "payment-method",
  "administrators"
];

const NavMenu = ({current, path}) => (
  <Step.Group
    size="tiny"
    fluid 
    vertical
  >
  {
    views.map((title, i) => {
      return (
      <Step key={i} link as={Link} to={path +'/'+ title} active={current === title}>
        <StepIcon />
        <Step.Content>
          <Step.Title>{_title(title)}</Step.Title>
        </Step.Content>
      </Step>
      )
    })
  }
  </Step.Group>
);

export default NavMenu;


function _title(pathname) {
  return pathname
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
;}