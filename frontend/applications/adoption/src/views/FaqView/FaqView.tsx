import * as React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  UncontrolledCollapse
  } from 'reactstrap';
import './FaqView.css';

const FAQ_LIST = [
  {
    title: 'Question One',
    content: 'Test 1'
  },
  {
    title: 'Question Two',
    content: 'Test 2'
  },
  {
    title: 'Question Three',
    content: 'Test 3'
  }
];
export const FaqView: React.SFC<{}> = _props => {
  return (
    <Container id="page-faq">
      <Row>
        <Col>
          {FAQ_LIST.map((question, index) => (
            <Card key={index}>
              <CardBody>
                <CardTitle id={`faq${index}`}>{question.title}</CardTitle>
                <UncontrolledCollapse toggler={`faq${index}`}>
                  <div dangerouslySetInnerHTML={{ __html: question.content }} />
                </UncontrolledCollapse>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default FaqView;
