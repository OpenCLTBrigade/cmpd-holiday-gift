// @flow

import * as React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Box from '../components/box';
import { getUser } from '../../../api/user';
import styled from 'styled-components';
import { approveUser, declineUser } from '../../../api/user';
import type {UserType, AffiliationType} from 'api/user';

const StyledButton = styled.button`
  margin-right:10px;
`;

export default class ViewUser extends React.Component<{
  match: { params: { user_id: number } }
}, {
  user: ?(UserType & { affiliation: AffiliationType })
}> {

  constructor() {
    super();
    this.state = { user: null };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    getUser(this.props.match.params.user_id).then((user: any) => {
      this.setState({ user: user.data });
    });
  }

  onClickApprove = () => {
    const { user } = this.state;
    approveUser(user.id).then((response) => {
      if (response.data === true) {
        this.getUser();
      } else {
        alert('An error occured while approving the user. Please try again.');
      }
    }).catch((err) => {
      alert('An error occured while approving the user. Please try again.');
      console.log(err);
    });
  }

  onClickDecline = () => {
    const { user } = this.state;
    declineUser(user.id).then((response) => {
      if (response.data === true) {
        this.getUser();
      } else {
        alert('An error occured while declining the user. Please try again.');
      }
    }).catch((err) => {
      alert('An error occured while declining the user. Please try again.');
      console.log(err);
    });
  }

  render(): React.Node {
    const { user } = this.state;

    if (user == null) {
      return null;
    }

    const listItems = user.nomination.map((nomination) =>
      <ListGroupItem>
        <a href={`/dashboard/household/show/${nomination.id}`}>
          {`${nomination.name_first} ${nomination.name_last}`}
        </a>
      </ListGroupItem>
    );

    return (
      <Grid>
      <Row>
        <Col xs={12}>
          <Box title={`${user.name_first} ${user.name_last}`}>
            <Row>
              <Col xs={12}>
                <ListGroup>
                  <ListGroupItem>
                    <strong>Affiliation</strong>
                    <br/>
                      { user.affiliation.name }
                    <br/>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Rank</strong>
                    <br/>
                      { user.rank }
                    <br/>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Role (Application Permission Level)</strong>
                    <br/>
                      { user.role }
                    <br/>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Nomination Limit</strong>
                    <br/>
                      { user.nomination_limit }
                    <br/>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Phone Number</strong>
                    <br/>
                      { user.phone }
                    <br/>
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Email Address</strong>
                    <br/>
                      { user.email }
                    <br/>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Box title="Nominations">
            <ListGroup>{ listItems }</ListGroup>
          </Box>
        </Col>
      </Row>
      {user.email_verified === true && user.approved === false && <Row>
        <Col xs={12}>
          <Box title='Review pending account'>
            <div style={{'text-align': 'center'}}>
              <StyledButton className="btn btn-lg btn-success" onClick={this.onClickApprove}>
                Approve
              </StyledButton>
            <StyledButton className="btn btn-lg btn-danger" onClick={this.onClickDecline}>
              Decline
            </StyledButton>
            </div>
          </Box>
        </Col>
      </Row>}
      </Grid>
    );
  }
}
