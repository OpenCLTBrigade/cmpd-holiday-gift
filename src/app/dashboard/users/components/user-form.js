// @flow
import React from 'react';
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import Box from '../../components/box';
import Input from './form/input';
import { Form } from 'neoform';
import { FormValidation } from 'neoform-validation';
import requiredValidator from '../validators/required.validator';

const HouseholdForm = ({ onSubmit, validate, onInvalid }) => {
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                validate(onSubmit, onInvalid);
            }}
        >
            <Row>
                <Col xs={12}>
                    <Box bsStyle="primary">
                        <Row>
                            <p>Note: After creating a new user they will need to be activated from the pending registrations screen.</p>
                        </Row>
                        <Row>
                            <Input
                                label="First Name"
                                name="user.firstName"
                                id="firstName"
                                type="text"
                                validator={reqiredValidator}
                            />
                        </Row>
                    </Box>
                </Col>
            </Row>
        </form>
    )
}
