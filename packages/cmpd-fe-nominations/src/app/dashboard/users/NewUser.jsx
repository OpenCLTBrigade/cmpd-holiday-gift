import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/user-form.js';
import { createUser } from '../../../api/user';

export default class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: '',
        name_first: '',
        name_last: '',
        role: '',
        rank: '',
        phone: '',
        email: '',
        active: '',
        nomination_limit: '',
        email_verified: '',
        approved: '',
        createdAt: '',
        updatedAt: '',
        password: '',
        affiliation_id: '',
        password_confirmation: ''
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

  onSubmit = () => {
    if (this.state.saving === true) {
      return;
    }

    this.setState({ saving: true }, () => {
      createUser(this.state.user)
        .then(response => {
          if (response.data == null) {
            alert(response.message);
          } else {
            alert('User has been created');
          }
          this.setState({ saving: false }, () => {
            window.location = '/dashboard/user';
          });
        })
        .catch(() => {
          alert(
            'Could not save user. An unknown error has occured. Perhaps a user with that email address already exists in the database?'
          );
        });
    });
  };

  render() {
    if (this.state.saving) {
      return <div>Saving...</div>;
    }

    return (
      <div>
        <UserForm
          data={this.state}
          getValue={getValue}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
