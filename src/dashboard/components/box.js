import React from 'react';

export default class Box extends React.Component {
  render() {
    return (
      <div className="box">
        <div className="box-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
