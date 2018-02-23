import * as React from 'react';
import { Alert } from 'react-bootstrap';

import HouseholdForm from './components/household-form';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import { getSchools } from '../../../api/affiliation';
import {
  createHousehold,
  submitNomination,
  getHousehold,
  uploadAttachment,
  updateHousehold,
  getNominationStatus
} from '../../../api/household';
import { getAddressInfo } from '../../../api/cmpd';
import ErrorModal from './components/ErrorModal';
import ConfirmModal from './components/ConfirmModal';
import withAsync from '../../components/withAsync';

import { pathOr } from 'rambda';

const HouseholdStatus = {
  New: 0,
  Draft: 1,
  Submitted: 2
};

const updateData = (oldData, newData) => {
  return {
    ...oldData,
    ...newData
  };
};

const parseValidationErrors = (errors = [], parentProperty = '') => {
  return errors.reduce((done, { children = [], property, constraints }) => {
    if (Array.isArray(children) && children.length > 0) {
      return done.concat(parseValidationErrors(children, property));
    } else {
      return done.concat({ property: [parentProperty, property].filter(Boolean).join('.'), constraints });
    }
  }, []);
};

const getId = state => state.id || (state.data && state.data.household && state.data.household.id);

class NewHousehold extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {
        household: {},
        address: {},
        children: [],
        schools: [],
        phoneNumbers: [],
        files: []
      },
      status: HouseholdStatus.New,
      errorMessage: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSaveDraft = this.onSaveDraft.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  addPhoneNumber() {
    this.setState(() => {
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
      const children = this.state.data.children.concat({});
      const data = updateData(this.state.data, { children });

      return { data };
    });
  }

  removeChild() {
    this.setState(() => {
      const children = this.state.data.children.slice();
      children.pop();

      const data = updateData(this.state.data, { children });

      return { data };
    });
  }

  async onFileChange(file) {
    const id = getId(this.state);

    if (id) {
      const saved = await uploadAttachment({ id, file });

      this.setState(() => {
        const files = this.state.data.files.concat(saved);
        const data = updateData(this.state.data, { files });

        return { data };
      });
    }
  }

  async onAddressChange(name, value) {
    const latlng = { ...value.latlng };
    delete value.latlng;
    // console.log('latlng', latlng);
    // console.log('oooooo', value);
    // TODO: Get CMPD Address Info

    try {
      const response = await getAddressInfo(latlng.lat, latlng.lng);

      const cmpdDivision = pathOr('', 'data.properties.DIVISION', response);
      const cmpdResponseArea = pathOr('', 'data.properties.RA', response);

      value.cmpdDivision = response.data.properties.DIVISION;
      value.cmpdResponseArea = response.data.properties.RA;

      value.type = this.state.data.address.type && this.state.data.address.type;
      this.onChange(name, value);
    } catch (error) {
      console.error(error);
    }
  }

  onChange(name, value) {
    this.setState(({ data }) => {
      return { data: setValue(data, name, value) };
    });
  }

  componentDidMount() {
    const { household, schools } = this.props;

    this.setState(() => ({ schools }));

    if (household) {
      const { id, children = [], phoneNumbers = [], address = {}, attachments: files = [] } = household;

      const status = household.draft ? HouseholdStatus.Draft : HouseholdStatus.Submitted;

      const newState = {
        data: {
          household,
          children,
          phoneNumbers,
          address,
          id,
          files
        },
        status
      };

      this.setState(() => newState);
    } else {
      const { status } = this.props;
      this.reset();
      this.setState(() => ({ disabled: status.count >= status.limit }));
    }
  }

  componentWillReceiveProps({ household, schools }) {}

  reset() {
    this.setState(() => {
      return {
        id: undefined,
        data: {
          household: {},
          address: {},
          children: [],
          schools: [],
          phoneNumbers: [],
          files: []
        },
        status: HouseholdStatus.New
      };
    });
  }

  onInvalid() {
    console.log('onInvalid');
  }

  async onSaveDraft() {
    try {
      const id = getId(this.state);

      if (id) {
        await updateHousehold(id, this.state.data);
      } else {
        const { id } = await createHousehold(this.state.data);

        this.setState({ status: HouseholdStatus.Draft, id: id });
      }
    } catch (error) {
      const errorMessage = error.response.status === 403 ? 'Nomination limit reached' : 'Something went wrong';

      const validationErrors = parseValidationErrors(error.response.data.message);

      this.setState(() => ({ show: true, errorMessage, validationErrors }));
    }
  }

  async onUpdate() {
    const { history } = this.props;

    const { id } = this.state.data.household && this.state.data.household;

    try {
      await updateHousehold(id, this.state.data).then(() => history.push('/dashboard/household'));
    } catch (error) {
      const errorMessage = 'Something went wrong';
      const validationErrors = parseValidationErrors(error.response.data.message);

      this.setState(() => ({ show: true, errorMessage, validationErrors }));
    }
  }

  async onSubmit() {
    const { history } = this.props;

    const id = this.state.id || (this.state.data && this.state.data.household && this.state.data.household.id);

    try {
      await submitNomination({ id });

      const redirectToList =
        this.props.match && this.props.match.params && this.props.match && this.props.match.params.id;

      if (redirectToList) {
        history.push('/dashboard/household');
      } else {
        this.showConfirmation();
      }
    } catch (e) {
      const errorMessage =
        e.response.status === 403 ? 'You must add at least one child to the household' : 'Something went wrong';

      this.setState(() => ({ show: true, errorMessage }));
    }
  }

  showConfirmation = () => this.setState(() => ({ showConfirm: true }));

  onSavedReject = () => {
    const { history } = this.props;
    const id = this.state.id || (this.state.data && this.state.data.household && this.state.data.household.id);

    this.setState(
      () => {
        return { showConfirm: false };
      },
      () => history.push(`show/${id}`)
    );
  };

  onSavedConfirm = () => {
    this.reset();
    this.setState(() => {
      return { showConfirm: false };
    });
  };

  render() {
    const handleClose = () => this.setState({ show: false, errorMessage: 'Something went wrong' });

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
          status={this.state.status}
          disabled={this.state.disabled}
          user={this.props.user}
        />
        <ErrorModal
          title="Oops - there's an error"
          message={this.state.errorMessage}
          validationErrors={this.state.validationErrors}
          show={this.state.show}
          handleClose={handleClose}
        />

        <ConfirmModal
          show={this.state.showConfirm}
          rejectText="View nomination"
          confirmText="Create another"
          onReject={this.onSavedReject}
          onConfirm={this.onSavedConfirm}
        />
      </div>
    );
  }
}

const fetchData = ({ id }) => async () => {
  let household = {};

  if (id) {
    household = await getHousehold(id);
  }

  const schools = await getSchools();
  const status = await getNominationStatus();

  return { household, schools, status };
};

export default withAsync({ async: fetchData })(NewHousehold);
