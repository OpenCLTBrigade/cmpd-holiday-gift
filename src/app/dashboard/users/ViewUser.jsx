import * as React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Box from '../components/box';
import { getUser } from '../../../api/user';


export default class ViewUser extends React.Component {

  constructor (props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    getUser(this.props.match.params.user_id).then((user: any) => {
      this.setState({ user: user.data });
    });
  }

  render(): React.Node {
    const { user } = this.state;

    if (user === null) {
      return null;
    }

    return (

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
    );
  }
}
