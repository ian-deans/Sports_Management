import React from "react";
import { Segment } from "semantic-ui-react";
import { Header } from "..";

class Panel extends React.Component {
  render() {
    const classname = this.props.className ? this.props.className : "";

    return (
      <Segment { ...this.props } raised className={ `panel ${ classname }` }>
        { this.props.children }
      </Segment>
    );
  }

  static Header( { text, className, children } ) {
    const classname = className ? className : "";

    return (
      <Segment className={ `panel-header-container ${ classname }` } basic>
        { text && ( <Header as="h3">{ text }</Header> ) }
        { children }
      </Segment>
    );
  }

  static Group( props ) {
    const { className } = props;
    const classname = className ? className : "";
    return (
      <Segment.Group { ...props } raised className={ `panels ${ classname }` }>
        { props.children }
      </Segment.Group>
    );
  }

  static Item( props ) {
    const { className } = props;
    const classname = className ? className : "";
    return (
      <Segment { ...props } className={ `panel-item ${ classname }` }>
        { props.children }
      </Segment>
    );
  }
}

export default Panel;
