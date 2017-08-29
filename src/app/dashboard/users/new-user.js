// @flow
import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/user-form.js';
import { createUser } from 'api/user';
import type { UserType } from 'api/user';


export default class NewUser extends React.Component<{}, *> {
  state: {
    user: UserType
  };
  constructor() {
    super();
    this.state = { user: {} };
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

  onSubmit(e: Event) {
    // TODO
    //e.preventDefault();
    console.log('onSubmit: ');
    console.log(this.state);
    createUser(this.state);
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
