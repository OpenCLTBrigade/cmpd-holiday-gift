import * as React from 'react';
import FormField from '../../../../app/components/form/FormField';
import Box from '../../components/box';
import SelectList from './select-list';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { getAllAffiliations } from '../../../../api/affiliation';
import { Form } from 'react-final-form';

async function fetchAffiliations() {
  const items = await getAllAffiliations(); // Page 1, not 0 - GIFT-241
  return items;
}

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: this.props.data.user, initial: {} };
  }

  componentWillReceiveProps({ data: { user } }) {
    if (user.id !== this.state.initial.id) {
      this.setState({ initial: user });
    }
  }

  render() {
    const { onSubmit, isEdit = true } = this.props;
    const { email: initialEmail } = this.state.initial;

    return (
      <Form
        onSubmit={onSubmit}
        initialValues={this.props.data}
        render={({ handleSubmit, reset, submitting, pristine, values }) => {
          const { user: { password, email } = {} } = values;
          const emailRequired = !isEdit || email !== initialEmail;
          const passwordRequired = !isEdit || !!password;

          return (
            <form id="create-new-user" onSubmit={handleSubmit}>
              <Row>
                <Col xs={12}>
                  <Box bsStyle="primary">
                    <Row>
                      <Col md={12}>
                        <FormField label="First Name" name="user.firstName" id="firstName" type="text" required />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormField label="Last Name" name={'user.lastName'} id="lastName" type="text" required />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <SelectList fetchAll={fetchAffiliations} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormField label="Rank" name={'user.rank'} id="rank" type="text" required />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormField label="Access Level" name={'user.role'} componentClass="select" required>
                          <option />
                          <option value="admin">admin</option>
                          <option value="nominator">nominator</option>
                          <option value="nominee">nominee</option>
                          <option value="partner">partner</option>
                          <option value="volunteer">volunteer</option>
                        </FormField>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormField
                          value={'user.nominationLimit'}
                          label="Nomiation Limit(Yearly)"
                          name={'user.nominationLimit'}
                          id="nominationLimit"
                          type="number"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormField label="Phone Number" name={'user.phone'} id="phoneNumber" type="text" required />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormField label="Email" name={'user.email'} id="email" type="text" required />
                      </Col>
                    </Row>
                    {emailRequired && (
                      <Row>
                        <Col md={12}>
                          <FormField
                            label="Confirmed Email Address"
                            name={'user.emailVerified'}
                            componentClass="select"
                            required>
                            <option />
                            <option value="false">No</option>
                            <option value="true">Yes-Confirmed</option>
                          </FormField>
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col md={12}>
                        <FormField label="Account Enabled" name={'user.active'} componentClass="select" required>
                          <option />
                          <option value="false">No-Deactivated</option>
                          <option value="true">Yes-Active</option>
                        </FormField>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormField
                          label="Password"
                          name={'user.password'}
                          id="password"
                          type="text"
                          required={passwordRequired}
                        />
                      </Col>
                    </Row>
                    {passwordRequired && (
                      <Row>
                        <Col md={12}>
                          <FormField
                            label="Password Confirmation"
                            name={'user.confirmationPassword'}
                            id="confirmationPassword"
                            type="text"
                            required
                          />
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col xs={12}>
                        <ButtonToolbar>
                          <Button bsStyle="info" type="submit" disabled={submitting}>
                            Save
                          </Button>
                          <span />
                          <Button bsStyle="warning" onClick={reset} disabled={submitting || pristine}>
                            Reset
                          </Button>
                        </ButtonToolbar>
                      </Col>
                    </Row>
                  </Box>
                </Col>
              </Row>
            </form>
          );
        }}
      />
    );
  }
}
