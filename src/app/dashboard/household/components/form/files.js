// @flow
import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import Box from '../../../components/box';

class Files extends React.PureComponent<any, any> {
  constructor() {
    super();
    (this: any).fileUpload = undefined;
  }

  render() {
    const { files, onChange } = this.props;
    return (
            <div>
                <Box title="Scanned Forms" bsStyle="primary">
                    {files &&
                        files.map(filename => (
                            <div key={`file-${filename}`}>
                                <a href={`/api/nominations/households/download/${filename}`} download>{filename}</a>
                            </div>
                        ))}

                    <Row>
                        <Col xs={12}>
                            <input
                                id="formControlsFile"
                                onChange={() => onChange(this.fileUpload.files)}
                                type="file"
                                label="File"
                                ref={ref => (this.fileUpload = ref)}
                            />
                        </Col>
                    </Row>
                </Box>
            </div>
    );
  }
}

export default Files;
