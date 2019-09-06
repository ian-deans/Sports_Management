import React from "react";
import { connect } from "react-redux";
// import { SmallSpinner } from "../../../../common";

class Review extends React.Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.init();
  }

  init = () => {
    // this.setState({loading: false});
    this.setState( {loading: false} );
  };

  cart = () => {
    const {cart} = this.props;
    return Object.keys( cart ).map( ( key, i ) => {
      return (
        <span key={i}>{`${key}: ${cart[key]} `}</span>
      );
    } );
  }


  render() {
    const cart = this.cart();
    return (
      <React.Fragment>
        <h2>Review / Submit Order</h2>
        {cart}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ( {
  cart: state.account.playerRegistration.cart,
} );

export default connect( mapStateToProps )( Review );