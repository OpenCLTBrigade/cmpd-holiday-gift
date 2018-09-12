import * as React from 'react';
import {
  Button,
  Col,
  Container,
  Row
  } from 'reactstrap';
import './VolunteerView.css';

const VolunteerInfoContent = [
  {
    title: 'Volunteer at the Warehouse',
    content: 'Sample text',
    buttonTitle: 'Apply Now',
    imageSource: 'http://placehold.it/700x300',
    linkTo: 'about:blank'
  },
  {
    title: 'Volunteer at the Warehouse',
    content: 'Sample text',
    buttonTitle: 'Apply Now',
    imageSource: 'http://placehold.it/700x300',
    linkTo: 'about:blank'
  },
  {
    title: 'Volunteer at the Warehouse',
    content: 'Sample text',
    buttonTitle: 'Apply Now',
    imageSource: 'http://placehold.it/700x300',
    linkTo: 'about:blank'
  }
];
const VolunteerView: React.SFC<{}> = _props => {
  return (
    <Container id="page-volunteer">
      {VolunteerInfoContent.map((content, index) => {
        return (
          <Row className="volunteer-option-row" key={index}>
            <Col md={4}>
              <a href="#">
                <img className="img-fluid rounded mb-3 mb-md-0" src={content.imageSource} alt="" />
              </a>
            </Col>
            <Col md={8}>
              <h3>{content.title}</h3>
              <p>{content.content}</p>
              <a className="btn btn-primary" href={content.linkTo}>
                {content.buttonTitle}
              </a>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default VolunteerView;
