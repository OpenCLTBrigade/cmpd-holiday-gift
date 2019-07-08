import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import Box from '../../../components/box';

export function Files({ files, onChange }) {
  const fileRef = React.useRef(undefined);

  function handleInputChange() {
    onChange(fileRef.current.files);
    fileRef.current.value = '';
  }

  return (
    <div>
      <Box title="Scanned Forms" bsStyle="primary">
        {files &&
          files.map(file => (
            <div key={`file-${file.name}`}>
              <a href={file.url} download target="_blank">
                {file.name}
              </a>
            </div>
          ))}
        <Row>
          <Col xs={12}>
            <p>Save as Draft before uploading form.</p>
            <p className="text-danger">Reminder: Nominations are not eligible for approval WITHOUT uploaded form.</p>
          </Col>
        </Row>
        {/* Re-used this box in ShowHousehold */}
        {onChange && (
          <Row>
            <Col xs={12}>
              <input
                id="formControlsFile"
                onChange={handleInputChange}
                type="file"
                label="File"
                accept="image/jpeg,image/png,application/pdf"
                ref={fileRef}
              />
            </Col>
          </Row>
        )}
      </Box>
    </div>
  );
}

export default Files;
