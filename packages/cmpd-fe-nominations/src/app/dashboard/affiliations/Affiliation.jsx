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
  // affiliation_id: ?number;
  constructor(props) {
    super(props);
    this.affiliation_id = null;
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
    const { affiliation_id } = this.props.match.params;
    this.affiliation_id = affiliation_id;
    getAffiliation(affiliation_id)
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
              <UserList affiliation_id={this.affiliation_id} />
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}
