import * as React from 'react';
import styled from 'styled-components';
import * as querystring from '../../lib/queryString';
import { emailConfirmation } from '../../api/confirm-email';

const CenteredContainer = styled.div`
  text-align: center;
`;

export default class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      loading: true,
      finished: false
    };
  }

  componentDidMount() {
    const qs = querystring.parse();
    const id = qs.id ? parseInt(qs.id, 10) : null;
    const confirmation_code = qs.confirmation_code || null;

    if (id === null || confirmation_code === null) {
      this.setState({ valid: false, loading: false });
    } else {
      emailConfirmation(id, confirmation_code)
        .then(response => {
          this.setState({ loading: false, finished: true });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
    }
  }

  render() {
    const { valid, loading, finished } = this.state;
    return (
      <CenteredContainer>
        {!valid && (
          <h3>
            Invalid entry point. <a href="/">Click here to go back to the log in screen.</a>
          </h3>
        )}
        {valid && loading && <h3>Working...</h3>}
        {valid &&
          finished && (
            <h3>
              Thanks for confirming your email.<br />
              You will be notified when an administrator has approved your account.
            </h3>
          )}
        {valid && !loading && !finished && <h3>An error occured while confirming your email address.</h3>}
      </CenteredContainer>
    );
  }
}
