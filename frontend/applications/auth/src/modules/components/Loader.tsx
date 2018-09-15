import * as React from 'react';
import '../../css/loader.css';

const Loader: React.SFC<{ style?: any }> = props => (
  <div className="lds-ellipsis" {...props}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loader;
