import * as React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Box from '../components/box';
import { getAffiliation } from '../../../api/affiliation';
import { UserList } from './components';

// type stateType = {
//   affiliation: Object
// };

// type propsType = {
//   match: Object
// };

export default class Affiliation extends React.Component {
  // affiliationId: ?number;
  constructor(props) {
    super(props);
    this.affiliationId = null;
    this.state = {
      affiliation: {
        name: '',
        type: '',
        addressStreet: '',
        addressStreet2: null,
        addressCity: '',
        addressState: '',
        addressZip: '',
        phone: null
      }
    };
  }

  componentDidMount() {
    const { affiliationId } = this.props.match.params;
    this.affiliationId = affiliationId;
    getAffiliation(affiliationId)
      .then(affiliation => {
        this.setState({ affiliation });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { affiliation } = this.state;
    const { phone, addressStreet, addressStreet2, addressCity, addressState, addressZip } = affiliation;
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title={affiliation.name}>
              <Row>
                <Col md={6}>
                  <ListGroup>
                    <ListGroupItem header="Name">
                      {affiliation.name} ({affiliation.type.toUpperCase()})
                    </ListGroupItem>
                    {phone && <ListGroupItem header="Phone Number">{phone}</ListGroupItem>}
                    <ListGroupItem header="Address">
                      {addressStreet}
                      {addressStreet2 != null && <span>{addressStreet2}</span>}
                      <br />
                      {addressCity}, {addressState}, {addressZip}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Box title={`Users in ${affiliation.name}`}>
              <UserList affiliationId={this.affiliationId} />
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}
