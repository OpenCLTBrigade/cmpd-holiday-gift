// @flow
import React from 'react';
import { withRouter } from 'react-router';

class AsyncLifeCycle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: undefined, render: false };
  }
  async componentWillMount() {
    const { fetchData, match } = this.props;
    const { params } = match;

    if (fetchData) {

      const data = await fetchData(params);

      this.setState(() => ({ data, render: true }));
    } else {
      this.setState(() => ({ render: true }));
    }
  }

  render() {
    const { data, render } = this.state;

    if (!render) {
      return null;
    }

    const { children } = this.props;

    return React.cloneElement(React.Children.only(children), data);
  }
}

const withFetch = fetchData => {
  return WrappedComponent =>
        withRouter(({ history, match, ...rest }) => {
          return (
                <AsyncLifeCycle match={match} fetchData={fetchData}>
                    <WrappedComponent history={history} match={match} {...rest} />
                </AsyncLifeCycle>
          );
        });
};

export default withFetch;
