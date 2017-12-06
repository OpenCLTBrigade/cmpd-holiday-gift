// @flow
import * as React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Box from '../components/box';
import { getAffiliation } from 'api/affiliation';
import { UserList } from './components';

type stateType = {
  affiliation: Object
};

type propsType = {
  match: Object
};

export default class Affiliation extends React.Component<propsType, stateType> {
  affiliation_id: ?number;
  constructor(props: Object) {
    super(props);
    this.affiliation_id = null;
    this.state = {
      affiliation: {
        name: '',
        type: '',
        address_street: '',
        address_street2: null,
        address_city: '',
        address_state: '',
        address_zip: '',
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

  render(): React.Node {
    const { affiliation } = this.state;
    const {
      phone,
      address_street,
      address_street2,
      address_city,
      address_state,
      address_zip
    } = affiliation;
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
                    {phone && (
                      <ListGroupItem header="Phone Number">
                        {phone}
                      </ListGroupItem>
                    )}
                    <ListGroupItem header="Address">
                      {address_street}
                      {address_street2 != null && (
                        <span>{address_street2}</span>
                      )}
                      <br />
                      {address_city}, {address_state}, {address_zip}
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
