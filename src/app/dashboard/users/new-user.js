// @flow
import * as React from 'react';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/user-form.js';



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
