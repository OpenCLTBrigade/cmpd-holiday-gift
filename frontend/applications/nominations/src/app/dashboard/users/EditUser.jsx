import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/UserForm';
import { getUser, updateUser } from '../../../api/user';
import { parseValidationErrors } from '../../../api/helpers/error.helper';
import ErrorModal from '../components/ErrorModal';

export default class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: '',
        firstName: '',
        lastName: '',
        role: '',
        rank: '',
        phone: '',
        email: '',
        active: '',
        nominationLimit: '',
        emailVerified: '',
        approved: '',
        password: '',
        affiliationId: '',
        confirmationPassword: ''
      },
      saving: false
    };
  }

  componentDidMount() {
    getUser(this.props.match.params.user_id)
      .then(user => {
        this.setState({ user });
      })
      .catch(e => {
        console.error(e);
        window.location = '/dashboard/users';
        alert('User could not be found.');
      });
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
      this.setState({ saving: true });
      const response = await updateUser(user);

      alert('User has been updated');

      this.setState({ saving: false }, () => {
        window.location = `/dashboard/user?search=${this.state.user.lastName || ''}`;
      });
    } catch (error) {
      const errorMessage = 'Something went wrong';
      const validationErrors = parseValidationErrors(error.validationErrors);

      this.setState(() => ({ showErrorModal: true, errorMessage, validationErrors }));
    }
  };

  render() {
    const { showErrorModal = false, errorMessage, validationErrors } = this.state;
    const handleClose = () => this.setState({ showErrorModal: false, errorMessage: 'Something went wrong' });

    return (
      <div>
        <UserForm
          saving={this.state.saving}
          data={this.state}
          getValue={getValue}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />

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
