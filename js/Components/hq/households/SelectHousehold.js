import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { getHouseholdSelection, selectHousehold } from "../../../actions/hq";

class SelectHousehold extends React.Component {
  state = {
    loading: false,
  }
  componentDidMount() {
    this.props.getHouseholdSelection();
  }

  handleChange = async ( event, data ) => {
    this.setState( {loading: true} );
    if ( this.props.current ) {
      if ( data.value !== this.props.current.id ) {
        return this.props.selectHousehold( data.value );
      } else {
        return;
      }
    }
    await this.props.selectHousehold( data.value );
    return this.setState( {loading: false} );

  }

  render() {
    const { loading } = this.state;
    const {info, selection} = this.props;
    const value = info ? info.id : 0;

    //TODO: Fix styling
    return (
      <Dropdown
        value={value}
        onChange={this.handleChange}
        options={selection}
        // item
        loading={loading}
        placeholder="Familes"
        scrolling
        closeOnBlur
      />
    );
  }
}

const mapStateToProps = state => ( {
  selection: state.hq.households.selection,
  info: state.hq.households.info,
} );

const mapDispatchToProps = {
  getHouseholdSelection,
  selectHousehold,
};

export default connect( mapStateToProps,  mapDispatchToProps )( SelectHousehold );