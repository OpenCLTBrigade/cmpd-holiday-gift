// @flow

import * as React from 'react';
import * as querystring from '../../lib/queryString';

import { packingSlip, bicycleSlip } from './packing';

function wrap<T>(asyncSlip: T => Promise<React.Node>): * {
  return class LoadingSlip extends React.Component<T, {content: React.Node}> {
    constructor(props) {
      super(props);
      this.state = { content: <h1>Loading...</h1> };
    }

    componentDidMount() {
      const qs: Object = querystring.parse();
      const household_id: number = qs.household_id ? parseInt(qs.household_id, 10) : null;

      asyncSlip(household_id).then(content => {
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

export const packing = wrap(packingSlip);
export const bicycle = wrap(bicycleSlip);