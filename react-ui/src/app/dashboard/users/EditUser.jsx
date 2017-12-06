// @flow
import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/user-form.js';
import { getUser, updateUser } from '../../../api/user';

export default class EditUser extends React.Component<{}, { user: * }> {
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

  componentDidMount() {
    getUser(this.props.match.params.user_id)
      .then((response: any) => {
        this.setState({ user: response.data });
      })
      .catch(() => {
        window.location = '/dashboard/users';
        alert('User could not be found.');
      });
  }

  onChange = (name: string, value: any) => {
    this.setState(prevState => {
      const newState = setValue(prevState, name, value);
      return newState;
    });
  };

  onInvalid() {
    console.log('onInvalid');
  }

  onSubmit = () => {
    // TODO
    // e.preventDefault();
    if (this.state.saving === true) {
      return;
    }

    this.setState({ saving: true }, () => {
      updateUser(this.state.user)
        .then(response => {
          if (response.data == null) {
            alert(response.message);
          } else {
            alert('User has been updated');
          }
          this.setState({ saving: false }, () => {
            window.location = `/dashboard/user?search=${this.state.user
              .name_last || ''}`;
          });
        })
        .catch(() => {
          alert('Could not save user. An unknown error has occured.');
        });
    });
  };

  render(): React.Node {
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
