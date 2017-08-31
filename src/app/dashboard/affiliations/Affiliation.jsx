// @flow
import * as React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Box from '../components/box';
import { getUserList } from 'api/user';
import { getAffiliation } from 'api/affiliation';

type stateType = {
  affiliation: Object,
  users: []
};

type propsType = {
  match: Object
};

export default class Affiliation extends React.Component<propsType, stateType> {
  constructor(props: Object) {
    super(props);
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
      },
      users: []
    };
  }

  componentDidMount() {
    const { affiliation_id } = this.props.match.params;
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
    const { phone, address_street, address_street2, address_city, address_state, address_zip } = affiliation;
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
                    {phone &&
                      <ListGroupItem header="Phone Number">
                        {phone}
                      </ListGroupItem>}
                    <ListGroupItem header="Address">
                      {address_street}
                      {address_street2 != null &&
                        <span>
                          {address_street2}
                        </span>}
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
            <Box title={`Users in ${affiliation.name}`}>Test</Box>
          </Col>
        </Row>
      </div>
    );
  }
}
