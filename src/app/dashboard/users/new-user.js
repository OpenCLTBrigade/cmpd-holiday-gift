// @flow
import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/user-form.js';
import { createUser } from 'api/user';

export default class NewUser extends React.Component<{}, *> {

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
<<<<<<< HEAD
    e.preventDefault();

    console.log("Submit: " + this.state);
=======
    //e.preventDefault();
    console.log('onSubmit: ');
    console.log(this.state);
>>>>>>> cab3d7065da30cf6b5d21ccdd04129342d1b8c47
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
