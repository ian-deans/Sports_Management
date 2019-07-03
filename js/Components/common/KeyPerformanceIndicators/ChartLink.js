import React from 'react';
import { Panel } from '..';

const ChartLink = props => {
  const net = props.net * 100;
  return (
    <Panel.Item
      onClick={() => props.handleClick(props.label, props.data, props.labels)}
      key={props.label}
      className={props.active ? "active" : ""}
    >
      <p className="label">{props.label}</p>
      <p className="total">{props.total}</p>
    </Panel.Item>
  );
};

export default ChartLink;