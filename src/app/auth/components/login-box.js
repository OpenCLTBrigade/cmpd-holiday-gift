import React from 'react';
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
`;

const Header = styled.div`
  background: #00355d;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -3px 0 rgba(0, 0, 0, .2) inset;
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

export default class LoginBox extends React.Component {
  state: {
    errorMessage: ?string
  };
  footer: any;
  email: HTMLInputElement;
  password: HTMLInputElement;

  constructor() {
    super();
    this.state = { errorMessage: null };
  }

  onSubmit(ev: Event) {
    let { onSubmit } = this.props;
    ev.preventDefault();
    let data = formToJSON(ev.target);

    if (!onSubmit) {
      console.error('LoginBox: onSubmit missing from props');
    } else {
      onSubmit(data);
    }
  }

  flashErrorMessage(message: string) {
    this.setState({ errorMessage: message });
  }

  render(): React.Element<any> {
    return (
      <Wrapper className="login-box" id="login-box">
        <Header>
          <i className="fa fa-sign-in" />
          {` ${this.props.title}`}
        </Header>
        {/* TODO:  Login box needs to accept content  */}
        <Body className="body">
          <ErrorMessage
            errorMessage={this.state.errorMessage}
            onDismissError={() => this.setState(() => ({ errorMessage: '' }))}
          />
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
