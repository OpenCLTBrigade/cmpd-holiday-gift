import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/UserForm';
import { createUser } from '../../../api/user';
import { parseValidationErrors } from '../../../api/helpers/error.helper';
import ErrorModal from '../components/ErrorModal';

export default class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        role: '',
        rank: '',
        phone: '',
        email: '',
        active: '',
        nominationLimit: '',
        emailVerified: '',
        password: '',
        affiliationId: '',
        confirmationPassword: ''
      },
      saving: false
    };
  }

  onChange = (name, value) => {
    this.setState(prevState => {
      const newState = setValue(prevState, name, value);
      return newState;
    });
  };

  onInvalid() {
    console.log('onInvalid');
  }

  onSubmit = async ({ user }) => {
    try {
      await createUser(user);
      alert('User has been created');
      window.location = '/dashboard/user';
    } catch (error) {
      const errorMessage = error.response.status === 403 ? 'Nomination limit reached' : 'Something went wrong';
      const validationErrors = parseValidationErrors(error.response.data.message);

      this.setState(() => ({ showErrorModal: true, errorMessage, validationErrors }));
    }
  };

  render() {
    const { showErrorModal = false, errorMessage, validationErrors } = this.state;
    const handleClose = () => this.setState({ showErrorModal: false, errorMessage: 'Something went wrong' });

    return (
      <div>
        <UserForm data={this.state} onSubmit={this.onSubmit} isEdit={false} />

        <ErrorModal
          title="Oops - there's an error"
          message={errorMessage}
          validationErrors={validationErrors}
          show={showErrorModal}
          handleClose={handleClose}
        />
      </div>
    );
  }
}
