import * as React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { getHousehold } from '../../../api/household';
import { getSchools } from '../../../api/affiliation';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { descFromValue } from 'lib/constants/bike-size';
import Files from './components/form/files';

const LabelText = styled.span`font-weight:bold;`;
const ValueText = styled.span`
  display:block;
`;

const DoNotPrint = styled.div`
  
`;


class ShowHousehold extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      household: null,
      schools: []
    };
  }

  componentDidMount() {

    getHousehold(this.props.match.params.id).then(response => {
      this.setState({ household: response });
    });

    getSchools().then(response => {
      this.setState({ schools: response.items });
    });

  }

  render() {
    const { household, schools } = this.state;

    if (household === null || schools.length === 0) {
      return null;
    }

    const { address } = household;

    return (
    <Grid>
      <Row>
        <Col xs={12}>
        <h1>Head of Household</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ListGroup>
            <ListGroupItem>
              <LabelText>Full Name</LabelText>
              <ValueText>{household.name_first} {household.name_middle} {household.name_last}</ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>Family #</LabelText>
              <ValueText>{household.id}</ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>Email</LabelText>
              <ValueText>{household.email}</ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>Gender</LabelText>
              <ValueText>{household.gender}</ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>Date of Birth</LabelText>
              <ValueText>{moment(household.dob).format('LL')}</ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>Last 4 SSN</LabelText>
              <ValueText>{household.last4ssn}</ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>Preferred Contact Method</LabelText>
              <ValueText>{household.preferred_contact_method}</ValueText>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h1>Address</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ListGroup>
            <ListGroupItem>
              <LabelText>
                Type
              </LabelText>
              <ValueText>
                {address.type}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Address
              </LabelText>
              <ValueText>
                {address.street} <br/>
                {address.street2 && <span>{address.street2}<br/></span>}
                {address.city}, {address.state}, {address.zip}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                CMPD Division
              </LabelText>
              <ValueText>
                {address.cmpd_division}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                CMPD Response Area
              </LabelText>
              <ValueText>
                {address.cmpd_response_area}
              </ValueText>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h1>Phone Number(s)</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <ListGroup>
            {household.phones && household.phones.map(phone => (<ListGroupItem>
              <LabelText>{phone.type}</LabelText>
              <ValueText>{phone.number}</ValueText>
            </ListGroupItem>))}
            {!household.phones && <ListGroupItem>No phone numbers entered!</ListGroupItem>}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h1>Children</h1>
        </Col>
      </Row>
      {household.children && household.children.map((child, index) => {
        const school = schools.filter(school => school.id === child.school_id)[0];
        return (
        <Row key={`childRow${child.id}`}>
          <Col xs={12}>
            <h2>Child {index + 1}</h2>
            <ListGroup>
            <ListGroupItem>
              <LabelText>
                Name
              </LabelText>
              <ValueText>
                {child.name_first} {child.name_middle} {child.name_last}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Gender
              </LabelText>
              <ValueText>
                {child.gender}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Age
              </LabelText>
              <ValueText>
                {child.age}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                DOB
              </LabelText>
              <ValueText>
                {moment(child.dob).format('LL')}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Race
              </LabelText>
              <ValueText>
                {child.race}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Last 4 SSN
              </LabelText>
              <ValueText>
                {child.last4ssn}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Free or Reduced Lunch?
              </LabelText>
              <ValueText>
                {child.free_or_reduced_lunch ? 'Yes' : 'No'}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Reason for Nomination
              </LabelText>
              <ValueText>
                {child.reason_for_nomination}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                School
              </LabelText>
              <ValueText>
                {school.name}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Bicycle
              </LabelText>
              <ValueText>
                {child.bike_want ? 'Yes' : 'No'}<br/>
                {child.bike_want && `Bike Style: ${child.bike_style}`}<br/>
                {child.bike_want && `Bike Size: ${descFromValue(child.bike_size)}`}<br/>
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Clothing
              </LabelText>
              <ValueText>
                {child.clothes_want ? 'Yes' : 'No'}<br/>
                {child.clothes_want && `Shirt Size: ${child.clothes_size_shirt}`}<br/>
                {child.clothes_want && `Pants Size: ${child.clothes_size_pants}`}<br/>
                {child.clothes_want && `Shoe Size: ${child.shoe_size}`}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Favorite Color
              </LabelText>
              <ValueText>
                {child.favourite_colour}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Interests
              </LabelText>
              <ValueText>
                {child.interests}
              </ValueText>
            </ListGroupItem>
            <ListGroupItem>
              <LabelText>
                Additional Ideas
              </LabelText>
              <ValueText>
                {child.additional_ideas}
              </ValueText>
            </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        );
      }
  )}

  {household && household.attachments &&
  <Files files={household.attachments}/>}

      <Row>
        <Col xs={12}>
          <DoNotPrint>
            <Link to="/dashboard/household">
              <Button primary>Go back</Button>
            </Link>
            <Link to={`/dashboard/household/edit/${household.id}`}>
              <Button success>Edit</Button>
            </Link>
          </DoNotPrint>
        </Col>
      </Row>
    </Grid>
    );
  }
}

export default ShowHousehold;