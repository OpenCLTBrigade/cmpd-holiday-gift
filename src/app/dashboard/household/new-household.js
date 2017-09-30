// @flow
import * as React from 'react';

import HouseholdForm from './components/household-form';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import { getSchools } from 'api/affiliation';
import { createHousehold } from 'api/household';

export default class NewHousehold
    extends React.Component<
        {},
        {
            household: {},
            address: {},
            nominations: Array<{}>,
            schools: Array<mixed>,
            phoneNumbers: Array<{}>,
            saved: false
        }
    > {
  constructor() {
    super();

    this.state = {
      household: {},
      address: {},
      nominations: [],
      schools: [],
      phoneNumbers: [],
      saved: false
    }

        ;(this: any).onChange = this.onChange.bind(this)
        ;(this: any).onSubmit = this.onSubmit.bind(this);
  }

  addChild() {
    this.setState(() => {
      return { nominations: this.state.nominations.concat({}) };
    });
  }

  removeChild() {
    const nominations = this.state.nominations.slice();
    nominations.pop();
    this.setState(() => {
      return { nominations };
    });
  }

  componentDidMount() {
    getSchools()
            .then(response => {
              this.setState(() => ({ schools: response.items }));
            })
            .catch(err => {
              console.log(err);
            });
  }

  onChange(name: string, value: any) {
    this.setState(prevState => {
      const newState = setValue(prevState, name, value);

      return newState;
    });
  }

  onInvalid() {
    console.log('onInvalid');
  }

  onSubmit() {
    createHousehold(this.state).then(() => this.setState({ saved: true }));
  }

  render(): React.Node {
    return (
            <div>
                <HouseholdForm
                    data={this.state}
                    getValue={getValue}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    addChild={this.addChild.bind(this)}
                    removeChild={this.removeChild.bind(this)}
                    affiliations={this.state.schools}
                    saved={this.state.saved}
                />
            </div>
    );
  }
}
