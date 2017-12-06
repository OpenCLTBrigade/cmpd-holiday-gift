// @flow
import React from 'react';
import { withRouter } from 'react-router';
import AsyncLifecycle from './AsyncLifecycle';

const withAsync = ({ async, renderLoading, renderError }) => {
  return WrappedComponent =>
    withRouter(props => {
      const { params } = props.match;

      return (
        <AsyncLifecycle
          async={async(params)}
          renderLoading={renderLoading}
          renderError={renderError}
          render={({ data }) => {
            return <WrappedComponent {...data} {...props} />;
          }}
        />
      );
    });
};

export default withAsync;
