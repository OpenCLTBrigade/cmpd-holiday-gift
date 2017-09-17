// @flow

import * as React from 'react';

import packingAsync from './packing';

function wrap<T>(asyncSlip: T => Promise<React.Node>): * {
  return class LoadingSlip extends React.Component<T, {content: React.Node}> {
    constructor(props) {
      super(props);
      this.state = { content: <h1>Loading...</h1> };
      asyncSlip(props).then(content => {
        this.setState({ content });
      }).catch(exc => {
        console.log('Failed to load data:', exc);
        this.setState({ content: <h1 style={{ color: 'red' }}>Failed to load data</h1> });
      });
    }
    render(): React.Node {
      return this.state.content;
    }
  };
}

export const packing = wrap(packingAsync);
