import * as React from 'react';

import { map } from 'rambda';
import { Grid, Row, Col, ListGroup, ListGroupItem, ButtonToolbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Files from './components/form/files';
import ChildDetail from './components/ChildDetail';
import { getHousehold } from '../../../api/household';
import { getSchools } from '../../../api/affiliation';
import withAsync from '../../components/withAsync';
import { FeedbackModal } from './components/FeedbackModal';

const getStatus = household => {
  if (!household.reviewed) {
    return 'Not Reviewed';
  }
  if (household.reviewed && household.approved) {
    return 'Approved';
  }

  return 'Rejected';
};

const LabelText = styled.span`font-weight: bold;`;
const ValueText = styled.span`display: block;`;

const DoNotPrint = styled.div``;

const LineItem = ({ label, text }) => (
    <ListGroupItem>
        <LabelText>{label}</LabelText>
        <ValueText>{text}</ValueText>
    </ListGroupItem>
);

const PhoneNumber = phoneNumber => (
    <LineItem key={phoneNumber.number} label={phoneNumber.type} text={phoneNumber.number} />
);
const PhoneNumberList = map(PhoneNumber);
const PhoneNumbers = ({ phoneNumbers }) => {
  return (
        <Row>
            <Col xs={12}>
                {phoneNumbers && <ListGroup>{PhoneNumberList(phoneNumbers)}</ListGroup>}
                {!phoneNumbers && <ListGroup>No phone numbers entered!</ListGroup>}
            </Col>
        </Row>
  );
};

const Address = ({ address }) => {
  return (
        <Row>
            <Col xs={12}>
                <ListGroup>
                    <LineItem label="Type" text={address.type} />
                    <ListGroupItem>
                        <LabelText>Address</LabelText>
                        <ValueText>
                            {address.street} <br />
                            {address.street2 && (
                                <span>
                                    {address.street2}
                                    <br />
                                </span>
                            )}
                            {address.city}, {address.state}, {address.zip}
                        </ValueText>
                    </ListGroupItem>
                    <LineItem label="CMPD Division" text={address.cmpd_division} />
                    <LineItem label="CMPD Response Area" text={address.cmpd_response_area} />
                </ListGroup>
            </Col>
        </Row>
  );
};

const RowTitle = ({ title }) => (
    <Row>
        <Col xs={12}>
            <h1>{title}</h1>
        </Col>
    </Row>
);

class ShowHousehold extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      household: {},
      schools: []
    };
  }


  componentWillMount() {
    const { household, schools = [] } = this.props;

    this.setState(() => ({ household, schools }));
  }

  render() {
    const { household, schools = [] } = this.state;

    if (household === null || schools.length === 0) {
      return null;
    }

    const { address } = household;

    return (
            <Grid>
                <RowTitle title="Head of Household" />
                <Row>
                    <Col xs={12}>
                        <ListGroup>
                            <LineItem
                                label="Full Name"
                                text={`${household.name_first} ${household.name_middle} ${household.name_last}`}
                            />
                            <LineItem label="Family #" text={household.id} />
                            <LineItem label="Email" text={household.email} />
                            <LineItem label="Gender" text={household.gender} />
                            <LineItem label="Date of Birth" text={moment(household.dob).format('LL')} />
                            <LineItem label="Last 4 SSN" text={household.last4ssn} />
                            <LineItem label="Preferred Contact Method" text={household.preferred_contact_method} />
                        </ListGroup>
                    </Col>
                </Row>
                <RowTitle title="Address" />
                <Address address={address} />
                <RowTitle title="Phone Number(s)" />
                <PhoneNumbers phoneNumbers={household.phoneNumbers} />
                <RowTitle title="Children" />
                {household.children &&
                    household.children.map(child => {
                      const school = schools.filter(school => school.id === child.school_id)[0];
                      return <ChildDetail key={`childRow${child.id}`} child={child} school={school} />;
                    })}

                {household && household.attachments && <Files files={household.attachments} />}

                <RowTitle title="Review Status" />
                <Row>
                    <Col xs={12}>
                        <ListGroup>
                            <LineItem label="Status" text={getStatus(household)} />
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <DoNotPrint>
                            <ButtonToolbar>
                                <Link className="btn btn-default" to="/dashboard/household">
                                    Go back
                                </Link>
                                <Link className="btn btn-info" to={`/dashboard/household/edit/${household.id}`}>
                                    Edit
                                </Link>
                                {!household.reviewed && (
                                    <Button
                                        bsStyle="primary"
                                        onClick={() => this.setState(() => ({ householdInReview: household }))}>
                                        Review
                                    </Button>
                                )}
                            </ButtonToolbar>
                        </DoNotPrint>
                    </Col>
                </Row>
                <FeedbackModal
                    household={this.state.householdInReview}
                    doClose={({ reviewed, approved } = {}) => this.setState(({ household }) => ({ householdInReview: undefined, household: { ...household, reviewed, approved } }))}
                />
            </Grid>
    );
  }
}

const fetchData = ({ id }) => async () => {
  const household = await getHousehold(id);
  const schools = await getSchools().then(({ items }) => items);

  return { household, schools };
};

export default withAsync({ async: fetchData })(ShowHousehold);
