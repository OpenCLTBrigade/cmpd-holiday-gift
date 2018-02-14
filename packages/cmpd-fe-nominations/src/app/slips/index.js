import * as React from 'react';
import * as querystring from '../../lib/queryString';

import { packingSlip, bicycleSlip } from './packing';

function wrap(asyncSlip) {
  return class LoadingSlip extends React.Component {
    constructor(props) {
      super(props);
      this.state = { content: <h1>Loading...</h1> };
    }

    componentDidMount() {
      const qs = querystring.parse();
      const household_id = qs.household_id
        ? parseInt(qs.household_id, 10)
        : null;

      asyncSlip(household_id)
        .then(content => {
          this.setState({ content });
        })
        .catch(exc => {
          console.log('Failed to load data:', exc);
          this.setState({
            content: <h1 style={{ color: 'red' }}>Failed to load data</h1>
          });
        });
    }

    render() {
      return this.state.content;
    }
  };
}

export const packing = wrap(packingSlip);
export const bicycle = wrap(bicycleSlip);
