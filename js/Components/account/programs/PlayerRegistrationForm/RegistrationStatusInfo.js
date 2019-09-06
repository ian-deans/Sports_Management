import React from "react";
import { connect } from "react-redux";

const RegistrationStatusInfo = props => {

  return (
    <div className="component-account-registration-status-info">
      <span>| Org: { props.orgId } |</span>
      <span>| Program: { props.programName } |</span>
      <span>| Player: { props.personId } |</span>
      <span>| Division: { props.divisionId } |</span>
      <span>| Profile: { props.profileId } |</span>
      <span>| PaymentPlan: { props.paymentPlanId } |</span>
      <span>| Registration: { props.registrationId } |</span>
      <span>| Cart: { props.cartId } |</span>
    </div>
  );
};

const mapStateToProps = ( { account: { playerRegistration: state } } ) => ( {
  orgId: state.org_id,
  programName: state.program_name,
  personId: state.person_id,
  divisionId: state.division_id,
  profileId: state.profile_id,
  paymentPlanId: state.payment_plan_id,
  registrationId: state.registration_id,
  cartId: state.cart_id,
  paymentMethodId: state.payment_method_id,


} );

export default connect( mapStateToProps )( RegistrationStatusInfo );

/**
 * org logo, program name, player image, player name,
 * payment plan name, fee, total cost, payment method brand/last4
 */