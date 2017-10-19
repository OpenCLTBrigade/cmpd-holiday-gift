// @flow
import * as React from 'react';

export default function Box(props: {
  title?: string,
  children: React.Node,
  bsStyle?: string
}): React.Element<any> {
  return (
    <div className={`box ${props.bsStyle != null ? 'box-' + props.bsStyle : ''}`}>
      {props.title != null &&
        <div className="box-header with-border">
          <h1 className="box-title">
            {props.title}
          </h1>
        </div>}
      <div className="box-body">
        {props.children}
      </div>
    </div>
  );
}
