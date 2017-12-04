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
            files.map(file => (
              <div key={`file-${file.filename}`}>
                <a href={file.url} download>
                  {file.filename}
                </a>
              </div>
            ))}
          <Row>
            <Col xs={12}>
              <p>Save as Draft before uploading form.</p>
              <p class="text-danger">
                Reminder: Nominations are not eligible for approval WITHOUT
                uploaded form.
              </p>
            </Col>
          </Row>
          {/* Re-used this box in ShowHousehold */}
          {onChange && (
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
          )}
        </Box>
      </div>
    );
  }
}

export default Files;
