import React from "react";
import { Grid, Input, TextArea } from 'semantic-ui-react';

// import API from '../actions/API';

import { GraphSmall, KeyPerformanceIndicators } from '../Components/common';

const TableData = [
  {
    logo: "BS",
    name: "Arsenal",
    registrations: 54,
    revenue: "$ 915.66"
  },
  {
    logo: "BS",
    name: "AC Milan",
    registrations: 48,
    revenue: "$ 456.75"
  },
  {
    logo: "BS",
    name: "Barcelona",
    registrations: 47,
    revenue: "$ 696.50"
  },
  {
    logo: "BS",
    name: "Borrusia Dortmund",
    registrations: 34,
    revenue: "$ 465.48"
  }
];

const TableColumns = [
  {
    Header: row => <div className="centered">Logo</div>,
    accessor: "logo",
    width: 107,
    Cell: row => <div className="centered">{row.value}</div>
  },
  { Header: "Name", accessor: "name", width: 203 },
  {
    Header: row => <div className="centered">Registrations</div>,
    accessor: "registrations",
    width: 148,
    Cell: row => <div className="centered">{row.value}</div>
  },
  { Header: "Revenue", accessor: "revenue", width: 100 }
];


class AdminDashboard extends React.Component {
  state = {
    url: '',
    method: '',
    payload: null,
    response: null,
  }

  handleChange = ( event, data ) => {
    return this.setState({ [data.name]: data.value });
  }


  handleButton= async (action) => {
    let response;

  }

  render() {
    return (
    <Grid>
      <Grid.Row>
        <Input name="url" onChange={ this.handleChange } value={ this.state.url }/>
        <Input name="method" onChange={ this.handleChange } value={ this.state.method }/>
        <button onClick={ this.sendRequest }>Send</button>
        <button onClick={() =>  this.handleButton('postClients')}>Post Client</button>
        <button onClick={ () =>  this.handleButton('getclients') }>Get Clients</button>
      </Grid.Row>
      <Grid.Row>
        { JSON.stringify(this.state.response) }
      </Grid.Row>
    </Grid>
    )
  };
};

export default AdminDashboard;
