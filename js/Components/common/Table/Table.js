import React from "react";
import { Table as STable } from "semantic-ui-react";
import { ErrorBoundary, Header, Panel } from "..";

export default class Table extends React.Component {
  render() {
    const {classname = ""} = this.props;
    return (
      <Panel.Group>
        {this.props.header && (
          <Panel.Header className="table-header">
            <Table.ToolBar text={this.props.header.text}>
              { this.props.header.options &&  (this.props.header.options.map( ( option, i ) =>
                <React.Fragment key={ i }>
                  {option}
                </React.Fragment>
              ))}
            </Table.ToolBar>
          </Panel.Header>
        )}
        <Panel.Item>
          <STable
            className={`cinch table ${classname}`}
            fixed
          >
            {this.props.columnNames && (
              <Table.ColumnNames names={ this.props.columnNames } />
            )}
            <STable.Body>
              {this.props.children}
            </STable.Body>
          </STable>
        </Panel.Item>
      </Panel.Group>
    );
  }
  static Row(props) {
    return <STable.Row {...props}>{props.children}</STable.Row>;
  }

  static Cell(props) {
    return <STable.Cell {...props}>{props.children}</STable.Cell>;
  }

  static ColumnNames({ names }) {
    return (
      <STable.Header fullWidth>
        <STable.Row>
          {names.map((columnName, i) => {
            if (!columnName) {
              return <STable.HeaderCell key={i} />;
            }
            return <STable.HeaderCell key={i}>{columnName}</STable.HeaderCell>;
          })}
        </STable.Row>
      </STable.Header>
    );
  }

  static ToolBar( { className, children, text } ) {
    const additionalClasses = className ? className : '';
    return (
      <ErrorBoundary>
        <div className={`toolbar ${additionalClasses}`}>
          <span className="tool-bar-menu">
            <Header>{ text }</Header>
          </span>
          { children }
        </div>
      </ErrorBoundary>
    )
  }

  static ToolBarMenu(props) {
    return (
      <span className="tool-bar-menu">
        { props.children }
      </span>
    )
  }
  //FIXME: Add default row for table if no rows are supplied
  // static defaultProps = {
  //   children: <Table.Row><Table.Cell>No Entries</Table.Cell></Table.Row>
  // };
}
