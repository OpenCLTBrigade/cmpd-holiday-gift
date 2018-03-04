import * as React from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import styled from 'styled-components';
import moment from 'moment';
import { descFromValue } from '../../../../lib/constants/bike-size';

const LineItem = ({ label, text }) => (
  <ListGroupItem>
    <LabelText>{label}</LabelText>
    <ValueText>{text}</ValueText>
  </ListGroupItem>
);

const LabelText = styled.span`
  font-weight: bold;
`;
const ValueText = styled.span`
  display: block;
`;
const age = (age, dob) => age || moment().diff(moment(dob).format('LL'), 'years');

export default function ChildDetail({ child, school }) {
  return (
    <Row key={`childRow${child.id}`}>
      <Col xs={12}>
        <h2>{`${child.firstName} ${child.lastName}`}</h2>
        <ListGroup>
          <LineItem label="Name" text={`${child.firstName} ${child.lastName}`} />
          <LineItem label="Child #" text={`${child.id}`} />
          <LineItem label="Gender" text={child.gender} />
          <LineItem label="Age" text={age(child.age, child.dob)} />
          <LineItem label="DOB" text={moment(child.dob).format('LL')} />
          <LineItem label="Race" text={child.race} />
          <LineItem label="Last 4 SSN" text={child.last4ssn} />
          <LineItem label="Free or Reduced Lunch?" text={child.freeOrReducedLunch ? 'Yes' : 'No'} />
          <LineItem label="Reason for Nomination" text={child.reasonForNomination} />
          <LineItem label="School" text={school && school.name} />
          <ListGroupItem>
            <LabelText>Bicycle</LabelText>
            <ValueText>
              {child.wantsBike ? 'Yes' : 'No'}
              <br />
              {child.wantsBike && `Bike Style: ${child.bikeStyle}`}
              <br />
              {child.wantsBike && `Bike Size: ${descFromValue(child.bikeSize)}`}
              <br />
            </ValueText>
          </ListGroupItem>
          <ListGroupItem>
            <LabelText>Clothing</LabelText>
            <ValueText>
              {child.wantsClothes ? 'Yes' : 'No'}
              <br />
              {child.wantsClothes && `Shirt Size: ${child.clothesShirtSize}`}
              <br />
              {child.wantsClothes && `Pants Size: ${child.clothesPantsSize}`}
              <br />
              {child.wantsClothes && `Coat Size: ${child.clothesCoatSize}`}
              <br />
              {child.wantsClothes && `Shoe Size: ${child.shoeSize}`}
            </ValueText>
          </ListGroupItem>
          <LineItem label="Favorite Color" text={child.favouriteColor} />
          <LineItem label="Interests" text={child.interests} />
          <LineItem label="Additional Ideas" text={child.additionalIdeas} />
        </ListGroup>
      </Col>
    </Row>
  );
}
