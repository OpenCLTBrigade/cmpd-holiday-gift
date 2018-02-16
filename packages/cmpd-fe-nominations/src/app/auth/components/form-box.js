import * as React from 'react';
import styled from 'styled-components';

import ErrorMessage from './error-message';

const formToJSON = elements =>
  [].reduce.call(
    elements,
    (data, { name, value }) => {
      if (name) {
        data[name] = value;
      }
      return data;
    },
    {}
  );

const Wrapper = styled.div`
  background-color: white;
  margin: 10px auto;
  width: 100%;
  max-width: 360px;
  border-radius: 4px;
`;

const Header = styled.div`
  background: #00355d;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -3px 0 rgba(0, 0, 0, 0.2) inset;
  color: #fff;
  font-size: 26px;
  font-weight: 300;
  padding: 20px 10px;
  text-align: center;
`;

const Body = styled.div`
  padding: 10px 20px 0 20px;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Button = styled.input`
  background-color: #00355d;
  font-weight: 700;
  color: #fff;
  &:hover {
    color: #fff;
  }

  &:focus {
    color: #fff;
  }
`;

export default class FormBox extends React.Component {
  // footer: $TODO;
  // email: HTMLInputElement;
  // password: HTMLInputElement;

  constructor() {
    super();
    this.state = {
      errorMessage: null,
      errorVisible: false // workaround because closing the alert stopped working
    };
  }

  onSubmit(ev) {
    const { onSubmit } = this.props;
    ev.preventDefault();
    const data = formToJSON(ev.target);

    if (!onSubmit) {
      console.error('LoginBox: onSubmit missing from props');
    } else {
      onSubmit(data);
    }
  }

  flashErrorMessage(message) {
    this.setState({
      errorMessage: message,
      errorVisible: true
    });
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Wrapper className="form-box" id="form-box">
        <Header>
          <i className={this.props.headerImageClass} />
          {` ${this.props.title}`}
        </Header>
        {/* TODO:  Login box needs to accept content  */}
        <Body className="body">
          {this.state.errorVisible === true && (
            <ErrorMessage
              errorMessage={this.state.errorMessage}
              onDismissError={() => {
                this.setState({
                  errorMessage: '',
                  errorVisible: false
                });
              }}
            />
          )}
          <Form onSubmit={this.onSubmit.bind(this)}>
            {this.props.body}
            <Button className="btn bg-auth btn-block btn-flat" type="submit" value={this.props.submitText} />
          </Form>
        </Body>
        {this.props.footer}
      </Wrapper>
    );
  }
}
