// @flow
import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/user-form.js';
import { getUserList } from 'api/user';
import type { UserType } from 'api/user';



export default class NewUser extends React.Component<{}, *> {
  constructor() {
    super();
    this.state = { user: {
      id: "",
      name_first: "test",
      name_last: "",
      role: "",
      rank: "",
      phone: "",
      email: "",
      active: "",
      nomination_limit: "",
      confirmation_email: "",
      confirmation_code: "",
      email_verified: "",
      approved: "",
      createdAt: "",
      updatedAt: "",
      affiliation_id: ""

    } };
  }

  onChange(name: string, value: any) {
    this.setState(prevState => {
      const newState = setValue(prevState, name, value);

      console.log('onChange: ' + JSON.stringify(newState));
      return newState;
    });
  }

  onInvalid() {
    console.log('onInvalid');
  }

  onSubmit() {
    // TODO
    // e.preventDefault();
    console.log('onSubmit: ');
    console.log(this.state);
  }

  render(): React.Node {

    return (
      <div>
        <UserForm
            data={this.state}
            getValue={getValue}
            onChange={this.onChange.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}
