/**
 * Display a message with information about completing further steps
 * to complete the process.
 * 
 * Also provide a link back to the account section
 * 
 * * For development - Provide a link to the HQ section. 
 */

import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { newOrganizationCompletionMessage } from "../../constants/messages";

console.log(newOrganizationCompletionMessage)

const NewOrganizationComplete = props => {

  return (
    <div>
      { newOrganizationCompletionMessage }
      <Link to="/app/account"><button>Back to Account</button></Link>
      <Link to="/app/hq"><button>To Organization HQ</button></Link>
    </div>
  )
};

export default NewOrganizationComplete;
