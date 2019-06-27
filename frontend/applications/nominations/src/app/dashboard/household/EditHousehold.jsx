import * as React from 'react';
import { Alert } from 'react-bootstrap';

import HouseholdForm from './components/household-form';
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
import { parseValidationErrors } from '../../../api/helpers/error.helper';

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
        childNominations: [],
        files: []
      },
      status: HouseholdStatus.New,
      errorMessage: ''
    };
  }

  componentDidMount() {
    const { household, schools } = this.props;

    this.setState(() => ({ schools }));

    if (household) {
      const {
        id,
        children: childNominations = [],
        phoneNumbers = [],
        address = {},
        attachments: files = []
      } = household;

      const status = household.draft ? HouseholdStatus.Draft : HouseholdStatus.Submitted;

      const newState = {
        data: {
          household,
          childNominations,
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

  onFileChange = async file => {
    const id = getId(this.state);

    if (id) {
      const saved = await uploadAttachment({ id, file });

      this.setState(() => {
        const files = this.state.data.files.concat(saved);
        const data = updateData(this.state.data, { files });

        return { data };
      });
    }
  };

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
      // this.onChange(name, value);
    } catch (error) {
      console.error(error);
    }
  }

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

  onSave = async ({ childNominations: children, ...data }) => {
    data.household.id ? this.onUpdate({ children, ...data }) : this.onSaveDraft({ children, ...data });
  };

  onSaveDraft = async data => {
    console.log('onSaveDraft');

    try {
      const id = getId(this.state);

      if (id) {
        await updateHousehold(id, data);
      } else {
        const { id } = await createHousehold(data);

        this.setState({ status: HouseholdStatus.Draft, id: id });
      }
    } catch (error) {
      const errorMessage = error.status === 403 ? 'Nomination limit reached' : 'Something went wrong';

      const validationErrors = parseValidationErrors(error.validationErrors);
      this.setState(() => ({ show: true, errorMessage, validationErrors }));
    }
  };

  onUpdate = async data => {
    console.log('onUpdate');
    const { history } = this.props;
    const { id } = this.state.data.household && this.state.data.household;

    try {
      await updateHousehold(id, data).then(() => history.push('/dashboard/household'));
    } catch (error) {
      const errorMessage = 'Something went wrong';

      const validationErrors = parseValidationErrors(error.validationErrors);

      this.setState(() => ({ show: true, errorMessage, validationErrors }));
    }
  };

  onSubmit = async () => {
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
  };

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
          onSubmit={this.onSubmit}
          onSave={this.onSave}
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
