import * as React from 'react';
import { Form } from 'neoform';
import Input from '../../../../app/components/input';
import Box from '../../components/box';
import SelectList from './select-list';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { FormValidation } from 'neoform-validation';
import { getAffiliationList } from '../../../../api/affiliation';
import requiredValidator from '../../../../lib/validators/required.validator';
// import type { AffiliationType } from 'api/affiliation';
// import type { UserType } from 'api/user';

async function fetchAffiliations() {
  const response = await getAffiliationList(1, null); // Page 1, not 0 - GIFT-241
  return response.items;
}

class UserForm extends React.Component {
  // initial: UserType;

  constructor(props) {
    super(props);

    this.state = { user: this.props.data.user, initial: {} };
  }

  componentWillReceiveProps({ data: { user } }) {
    if (user.id !== this.state.initial.id) {
      this.setState({ initial: user });
    }
  }

  onReset = () => {
    this.setState({ user: this.initial });
    this.props.validate();
  };

  render() {
    const { onSubmit, validate, onInvalid, isEdit = true, saving: disabled = false } = this.props;
    const { user: { password, email } = {} } = this.props.data;
    const { email: initialEmail } = this.state.initial;

    const emailRequired = !isEdit || email !== initialEmail;
    const passwordRequired = !isEdit || !!password;

    return (
      <form
        id="create-new-user"
        onSubmit={e => {
          e.preventDefault();
          validate(onSubmit, onInvalid);
          onSubmit(this.props.data);
        }}>
        <Row>
          <Col xs={12}>
            <Box bsStyle="primary">
              {/* <Row>
                <Col md={12}>
                  <p>
                    <strong>Note:</strong> After creating a new user they will need to be activated from the
                    <a href="/dashboard/user/pending"> pending registrations </a>
                    screen.
                  </p>
                </Col>
              </Row> */}
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.firstName'}
                    label="First Name"
                    name={'user.firstName'}
                    id="firstName"
                    type="text"
                    validator={requiredValidator}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.lastName'}
                    label="Last Name"
                    name={'user.lastName'}
                    id="lastName"
                    type="text"
                    validator={requiredValidator}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <SelectList fetchAll={fetchAffiliations} />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.rank'}
                    label="Rank"
                    name={'user.rank'}
                    id="rank"
                    type="text"
                    validator={requiredValidator}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.role'}
                    label="Access Level"
                    name={'user.role'}
                    componentClass="select"
                    validator={requiredValidator}>
                    <option />
                    <option value="admin">admin</option>
                    <option value="nominator">nominator</option>
                    <option value="nominee">nominee</option>
                    <option value="partner">partner</option>
                    <option value="volunteer">volunteer</option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.nominationLimit'}
                    label="Nomiation Limit(Yearly)"
                    name={'user.nominationLimit'}
                    id="nominationLimit"
                    type="number"
                    validator={requiredValidator}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.phone'}
                    label="Phone Number"
                    name={'user.phone'}
                    id="phoneNumber"
                    type="text"
                    validator={requiredValidator}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.email'}
                    label="Email"
                    name={'user.email'}
                    id="email"
                    type="text"
                    validator={requiredValidator}
                  />
                </Col>
              </Row>
              {emailRequired && (
                <Row>
                  <Col md={12}>
                    <Input
                      value={'user.emailVerified'}
                      label="Confirmed Email Address"
                      name={'user.emailVerified'}
                      componentClass="select"
                      validator={requiredValidator}>
                      <option />
                      <option value="false">No</option>
                      <option value="true">Yes-Confirmed</option>
                    </Input>
                  </Col>
                </Row>
              )}
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.active'}
                    label="Account Enabled"
                    name={'user.active'}
                    componentClass="select"
                    validator={requiredValidator}>
                    <option />
                    <option value="false">No-Deactivated</option>
                    <option value="true">Yes-Active</option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    value={'user.password'}
                    label="Password"
                    name={'user.password'}
                    id="password"
                    type="text"
                    validator={passwordRequired && requiredValidator}
                  />
                </Col>
              </Row>
              {passwordRequired && (
                <Row>
                  <Col md={12}>
                    <Input
                      value={'user.confirmationPassword'}
                      label="Password Confirmation"
                      name={'user.confirmationPassword'}
                      id="confirmationPassword"
                      type="text"
                      validator={requiredValidator}
                    />
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={12}>
                  <ButtonToolbar>
                    <Button bsStyle="info" type="submit" disabled={disabled}>
                      Save
                    </Button>
                    <span />
                    <Button bsStyle="warning" onClick={() => this.onReset()}>
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
  }
}

export default Form(FormValidation(UserForm));

// ToDo implement onSubmit here
