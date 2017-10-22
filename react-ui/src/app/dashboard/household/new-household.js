// @flow
import * as React from 'react';

import HouseholdForm from './components/household-form';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import { getSchools } from 'api/affiliation';
import {
    createHousehold,
    submitNomination,
    getHousehold,
    uploadAttachment,
    updateHousehold,
    getNominationStatus
} from 'api/household';
import { getAddressInfo } from 'api/cmpd';
import ErrorModal from './components/error-modal';
import { Alert } from 'react-bootstrap';

const LoadingState = {
  NotStarted: 0,
  Loading: 1,
  Success: 2,
  Error: 3
};

const updateData = (oldData, newData) => {
  return {
    ...oldData,
    ...newData
  };
};

export default class NewHousehold extends React.Component<
    {},
    {
        household: {},
        address: {},
        nominations: Array<{}>,
        schools: Array<mixed>,
        phoneNumbers: Array<{}>,
        saved: false,
        errorMessage: ''
    }
> {
  constructor() {
    super();

    this.state = {
      data: {
        household: {},
        address: {},
        nominations: [],
        schools: [],
        phoneNumbers: [],
        files: []
      },
      loadingState: LoadingState.NotStarted,
      saved: false,
      errorMessage: ''
    }
        ;(this: any).onChange = this.onChange.bind(this)
        ;(this: any).onSubmit = this.onSubmit.bind(this)
        ;(this: any).onSaveDraft = this.onSaveDraft.bind(this)
        ;(this: any).onFileChange = this.onFileChange.bind(this)
        ;(this: any).onUpdate = this.onUpdate.bind(this);
  }

  addPhoneNumber() {
    this.setState(() => {
      console.log(this);
      //TODO: Should really clean this up by using reselect
      const phoneNumbers = this.state.data.phoneNumbers.concat({});
      const data = updateData(this.state.data, { phoneNumbers });

      return { data };
    });
  }

  removePhoneNumber() {
    this.setState(() => {
      const phoneNumbers = this.state.data.phoneNumbers.slice();
      phoneNumbers.pop();
      const data = updateData(this.state.data, { phoneNumbers });

      return { data };
    });
  }

  addChild() {
    this.setState(() => {
      const nominations = this.state.data.nominations.concat({});
      const data = updateData(this.state.data, { nominations });

      return { data };
    });
  }

  removeChild() {
    this.setState(() => {
      const nominations = this.state.data.nominations.slice();
      nominations.pop();

      const data = updateData(this.state.data, { nominations });

      return { data };
    });
  }

  async onFileChange(file) {
    const { id = undefined } = this.state;

    if (id) {
      const saved = await uploadAttachment({ id, file });

      this.setState(() => {
        const files = this.state.data.files.concat(saved);
        const data = updateData(this.state.data, { files });

        return { data };
      });
    }
  }

  onAddressChange(name: string, value: any) {
    const latlng = { ...value.latlng };
    delete value.latlng;
        // console.log('latlng', latlng);
        // console.log('oooooo', value);
        // TODO: Get CMPD Address Info
    getAddressInfo(latlng.lat, latlng.lng).then(response => {
      if (!response || response.data === null) {
        console.log('CMPD Division / Address not found');
        value.cmpd_division = '';
        value.cmpd_response_area = '';
      } else {
        value.cmpd_division = response.data.properties.DIVISION;
        value.cmpd_response_area = response.data.properties.RA;
      }
      this.onChange(name, value);
    });
  }

  onChange(name: string, value: any) {
    this.setState(({ data }) => {
      return { data: setValue(data, name, value) };
    });
  }

  async componentDidMount() {
    try {
      const { id = undefined } = this.props.match && this.props.match.params;
      if (id) {
        this.setState(() => ({ loadingState: LoadingState.Loading }));

        const household = await getHousehold(id);
        const {
                    children: nominations = [],
                    phoneNumbers = [],
                    address = {},
                    attachments: files = []
                } = household;
        const newState = { data: { household, nominations, phoneNumbers, address, id, files } };

        this.setState(() => newState);
        this.setState(() => ({ loadingState: LoadingState.Success }));

      } else {
        const status = await getNominationStatus();
        this.setState(() => ({ disabled: status.count >= status.limit }));
      }

      const { items: schools } = await getSchools();

      this.setState(() => ({ schools }));
    } catch (error) {
      console.log(error);
      this.setState(() => ({ loadingState: LoadingState.Error }));

    }
  }

  reset() {
    this.setState(() => {
      return {
        data: {
          household: {},
          address: {},
          nominations: [],
          schools: [],
          phoneNumbers: [],
          files: [],
        },
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
        await updateHousehold(id, this.state.data);
      } else {
        const { id } = await createHousehold(this.state.data);

        this.setState({ saved: true, id: id });
      }
    } catch (error) {
      console.log(error.response.status);
      const errorMessage = error.response.status === 403 ? 'Nomination limit reached' : 'Something went wrong';
      this.setState(() => ({ show: true, errorMessage }));
      console.error(error);
    }
  }

  onUpdate() {
    const { history } = this.props;

    const { id } = this.state.data.household && this.state.data.household;
    updateHousehold(id, this.state.data).then(() => history.push('/dashboard/household'));
  }

  onSubmit() {
    submitNomination({ id: this.state.id }).then(() => this.reset());
  }

  render(): React.Node {
    const handleClose = () => this.setState({ show: false, errorMessage: 'Something went wrong' });

    if (this.state.loadingState === LoadingState.Loading) {
      return null;
    }

    if (this.state.loadingState === LoadingState.Error) {
      return (
                <Alert bsStyle="danger">
                    <strong>Sorry!</strong> There was an error loading this form.
                </Alert>
      );
    }

    return (
            <div>
                {this.state.disabled && (
                    <Alert bsStyle="warning">
                        <strong>Sorry!</strong> Your nomination limit has been reached.
                    </Alert>
                )}
                <HouseholdForm
                    data={this.state.data}
                    getValue={getValue}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    onUpdate={this.onUpdate}
                    onSaveDraft={this.onSaveDraft}
                    addChild={this.addChild.bind(this)}
                    removeChild={this.removeChild.bind(this)}
                    removePhoneNumber={this.removePhoneNumber.bind(this)}
                    addPhoneNumber={this.addPhoneNumber.bind(this)}
                    onFileChange={this.onFileChange}
                    affiliations={this.state.schools}
                    onAddressChange={address => this.onAddressChange('address', address)}
                    saved={this.state.saved}
                    disabled={this.state.disabled}
                />
                <ErrorModal
                    title="Oops - there's an error"
                    message={this.state.errorMessage}
                    show={this.state.show}
                    handleClose={handleClose}
                />
            </div>
    );
  }
}
