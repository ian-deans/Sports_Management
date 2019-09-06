import React from "react";
import { Table as STable } from "semantic-ui-react";
import { ErrorBoundary, Header, Panel } from "..";

class Table extends React.Component {
  tableHeader = ( { title, headerExtras } ) => {
    if ( !title ) {
      return null;
    }

    return [
      <Header key={ 1 }>{ title }</Header>,
      <span key={ 2 } className="table-header-extras">
        { headerExtras &&
          headerExtras.map( ( extra, i ) => {
            return <React.Fragment key={ i }>{ extra }</React.Fragment>;
          } ) }
      </span>
    ];
  };

  headerRow = columns => {
    if ( !columns ) {
      return null;
    }

    return (
      <STable.Row>
        { [ ...columns.keys() ].map( ( name, i ) => {
          if ( !name ) {
            return <STable.HeaderCell key={ i } />;
          }
          return <STable.HeaderCell key={ i }>{ name }</STable.HeaderCell>;
        } ) }
      </STable.Row>
    );
  };

  rows = ( { rowData, rowExtras, columns } ) => {
    if ( !rowData ) {
      return [];
    }
    const extractedData = this.extractRowData( { rowData, columns } );
    const finishedData = rowExtras
      ? this.appendRowExtras( extractedData )
      : extractedData;
    return this.rowComponents( finishedData );
  };

  rowComponents = rowData =>
    rowData.map( ( data, i ) => (
      <STable.Row key={ i }>
        { data.map( ( value, k ) => (
          <STable.Cell key={ k }>{ value }</STable.Cell>
        ) ) }
      </STable.Row>
    ) );

  extractRowData = ( { rowData, columns } ) => {
    return rowData.map( rowData =>
      [ ...columns.values() ].map( field => rowData[ field ] )
    );
  };

  appendRowExtras = rowValues => {

    return rowValues.map( ( row, i ) => {
      const extras = this.props.rowExtras.map( fn => fn( this.props.rowData[ i ] ) );
      return row.concat( extras );
    } );
  };

  render() {
    const {
      header: [ title, ...headerExtras ],
      columns,
      rowData,
      rowExtras
    } = this.props;

    const tableHeader = this.tableHeader( { title, headerExtras } );
    const headerRow = this.headerRow( columns );
    const rows = this.rows( { rowData, rowExtras, columns } );

    return (
      <ErrorBoundary>
        <Panel.Group>
          <Panel.Header className="flexbox justified-space-between aligned-center table-header">
            { tableHeader }
          </Panel.Header>

          <Panel.Item>
            <STable fixed padded="very" className="cinch table">
              <STable.Header fullWidth>{ headerRow }</STable.Header>

              <STable.Body>{ rows }</STable.Body>
            </STable>
          </Panel.Item>
        </Panel.Group>
      </ErrorBoundary>
    );
  }
}

export default Table;
