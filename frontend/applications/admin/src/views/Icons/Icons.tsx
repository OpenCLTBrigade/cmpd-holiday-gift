import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import { iconsArray } from '../../variables/Variables';

class Icons extends React.Component<any, any> {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="202 Awesome Stroke Icons"
                ctAllIcons
                category={
                  <span>
                    Handcrafted by our friends from{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://themes-pixeden.com/font-demos/7-stroke/index.html">
                      Pixeden
                    </a>
                  </span>
                }
                content={
                  <Row>
                    {iconsArray.map((prop, key) => {
                      return (
                        <Col lg={2} md={3} sm={4} xs={6} className="font-icon-list" key={key}>
                          <div className="font-icon-detail">
                            <i className={prop} />
                            <input type="text" defaultValue={prop} />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Icons;
