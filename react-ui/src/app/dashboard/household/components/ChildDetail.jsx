import * as React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import styled from 'styled-components';
import moment from 'moment';
import { descFromValue } from 'lib/constants/bike-size';

const LineItem = ({ label, text }) => (
    <ListGroupItem>
        <LabelText>{label}</LabelText>
        <ValueText>{text}</ValueText>
    </ListGroupItem>
);

const LabelText = styled.span`font-weight: bold;`;
const ValueText = styled.span`display: block;`;
const age = (age, dob) => age || moment().diff(moment(dob).format('LL'), 'years');

export default function ChildDetail({ child, school }) {
  return (
        <Row key={`childRow${child.id}`}>
            <Col xs={12}>
                <h2>{`${child.name_first} ${child.name_last}`}</h2>
                <ListGroup>
                    <LineItem label="Name" text={`${child.name_first} ${child.name_last}`} />
                    <LineItem label="Child #" text={`${child.id}`} />
                    <LineItem label="Gender" text={child.gender} />
                    <LineItem label="Age" text={age(child.age, child.dob)} />
                    <LineItem label="DOB" text={moment(child.dob).format('LL')} />
                    <LineItem label="Race" text={child.race} />
                    <LineItem label="Last 4 SSN" text={child.last4ssn} />
                    <LineItem label="Free or Reduced Lunch?" text={child.free_or_reduced_lunch ? 'Yes' : 'No'} />
                    <LineItem label="Reason for Nomination" text={child.reason_for_nomination} />
                    <LineItem label="School" text={school && school.name} />
                    <ListGroupItem>
                        <LabelText>Bicycle</LabelText>
                        <ValueText>
                            {child.bike_want ? 'Yes' : 'No'}
                            <br />
                            {child.bike_want && `Bike Style: ${child.bike_style}`}
                            <br />
                            {child.bike_want && `Bike Size: ${descFromValue(child.bike_size)}`}
                            <br />
                        </ValueText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <LabelText>Clothing</LabelText>
                        <ValueText>
                            {child.clothes_want ? 'Yes' : 'No'}
                            <br />
                            {child.clothes_want && `Shirt Size: ${child.clothes_size_shirt}`}
                            <br />
                            {child.clothes_want && `Pants Size: ${child.clothes_size_pants}`}
                            <br />
                            {child.clothes_want && `Shoe Size: ${child.shoe_size}`}
                        </ValueText>
                    </ListGroupItem>
                    <LineItem label="Favorite Color" text={child.favourite_colour} />
                    <LineItem label="Interests" text={child.interests} />
                    <LineItem label="Additional Ideas" text={child.additional_ideas} />
                </ListGroup>
            </Col>
        </Row>
  );
}
