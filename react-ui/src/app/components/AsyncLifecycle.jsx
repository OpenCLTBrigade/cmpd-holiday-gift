import React from 'react';

const Status = {
  NotStarted: 0,
  Loading: 1,
  Success: 2,
  Error: 3
};

const Loading = () => <div>Loading...</div>;
const Error = () => <div>I'm sorry! Please try again.</div>;

const defaultRenderLoading = () => <Loading />;
const defaultRenderError = () => <Error />;

export default class AsyncLifeCycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: undefined, status: Status.NotStarted };
  }

  async componentWillMount() {
    const { async } = this.props;

    this.setState(() => ({ status: Status.Loading }));

    try {
      if (async) {
        const data = await async();

        this.setState(() => ({ data, status: Status.Success }));
      } else {
        this.setState(() => ({ status: Status.Success }));
      }
    } catch (error) {
      console.log(error);
      this.setState(() => ({ error, status: Status.Error }));
    }
  }

  render() {
    const {
      renderLoading = defaultRenderLoading,
      renderError = defaultRenderError,
      render,
      ...rest
    } = this.props;
    const { status, error, data } = this.state;

    if (status === Status.Loading) {
      return renderLoading();
    }

    if (status === Status.Error) {
      return renderError(error);
    }

    if (status === Status.Success) {
      return this.props.render({ data, rest });
    }

    return null;
  }
}
