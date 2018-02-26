import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/user-form.js';
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

  onSubmit = async () => {
    try {
      this.setState({ saving: true });
      const response = await updateUser(this.state.user);

      if (response.data == null) {
        alert(response.message);
      } else {
        alert('User has been updated');
      }
      this.setState({ saving: false }, () => {
        window.location = `/dashboard/user?search=${this.state.user.lastName || ''}`;
      });
    } catch (error) {
      const errorMessage = error.response.status === 403 ? 'Nomination limit reached' : 'Something went wrong';

      const validationErrors = parseValidationErrors(error.response.data.message);

      this.setState(() => ({ showErrorModal: true, errorMessage, validationErrors }));
    }
    // TODO
    // e.preventDefault();
    // if (this.state.saving === true) {
    //   return;
    // }

    // this.setState({ saving: true }, async () => {

    // });
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
