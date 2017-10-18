// @flow
import * as React from 'react';

import HouseholdForm from './components/household-form';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import { getSchools } from 'api/affiliation';
import { createHousehold, submitNomination, getHousehold, uploadAttachment, updateHousehold } from 'api/household';
import ErrorModal from './components/error-modal';

export default class NewHousehold extends React.Component<
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
      saved: false,
      files: []
    }
        ;(this: any).onChange = this.onChange.bind(this)
        ;(this: any).onSubmit = this.onSubmit.bind(this)
        ;(this: any).onSaveDraft = this.onSaveDraft.bind(this)
        ;(this: any).onFileChange = this.onFileChange.bind(this);
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

  async onFileChange(file) {
    const { id = undefined } = this.state;

    if (id) {
      const saved = await uploadAttachment({ id, file });

      this.setState(() => {
        const { files } = this.state;

        return { files: files.concat(saved) };
      });
    }
  }

  onChange(name: string, value: any) {
    this.setState(prevState => {
      const newState = setValue(prevState, name, value);

      return newState;
    });
  }

  async componentDidMount() {
    try {
      const { id = undefined } = this.props.match && this.props.match.params;
      if (id) {
        const household = await getHousehold(id);
        const { children: nominations = [], phoneNumbers = [], address = {}, attachments: files = [] } = household;

        this.setState(() => ({ household, nominations, phoneNumbers, address, id, files }));
      }

      const { items: schools } = await getSchools();

      this.setState(() => ({ schools }));
    } catch (error) {
      console.log(error);
    }
  }

  reset() {
    this.setState(() => {
      return {
        household: {},
        address: {},
        nominations: [],
        schools: [],
        phoneNumbers: [],
        attachments: [],
        saved: false
      };
    });
  }

  onInvalid() {
    console.log('onInvalid');
  }

  async onSaveDraft() {
    try {
      const { id = undefined } = this.state;
      if (id) {
        await updateHousehold(id, this.state);
      } else {
        const { id } = await createHousehold(this.state);

        this.setState({ saved: true, id: id });
      }
    } catch (error) {
      this.setState(() => ({ show: true }));
      console.error(error);
    }
  }

    onUpdate() {
        const {history} = this.props;
        
      let { id } = this.state.household && this.state.household;
      updateHousehold(id, this.state).then(() => history.push('/dashboard/household'))
    }

    onSubmit() {        
        submitNomination({ id: this.state.id }).then(() => this.reset())
    }

  render(): React.Node {
    const handleClose = () => this.setState({ show: false });

    return (
            <div>
                <HouseholdForm
                    data={this.state}
                    getValue={getValue}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    onUpdate={this.onUpdate}
                    onSaveDraft={this.onSaveDraft}
                    addChild={this.addChild.bind(this)}
                    removeChild={this.removeChild.bind(this)}
                    onFileChange={this.onFileChange}
                    affiliations={this.state.schools}
                    onAddressChange={address => this.onChange('address', address)}
                    saved={this.state.saved}
                />
                <ErrorModal title="Oops" messsage="Something went wrong" show={this.state.show} handleClose={handleClose} />
            </div>
    );
  }
}
