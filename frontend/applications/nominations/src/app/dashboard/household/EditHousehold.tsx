import { useState } from 'react';
import { useHousehold, useAffiliations, useHouseholdChildren, useHouseholdAttachments } from '../../../hooks';
import React from 'react';

import ErrorModal from './components/ErrorModal';
import ConfirmModal from './components/ConfirmModal';
import { Alert } from 'react-bootstrap';

import HouseholdForm from './components/household-form';
import {
  submitNomination,
  updateHousehold,
  updateHouseholdChildren,
  uploadAttachment
} from '../../../services/household';

export function EditHousehold(props) {
  const [error, setError] = useState({
    showError: false,
    errorMessage: '',
    validationErrors: []
  });
  //TODO: Set disabled based on whether household limit exceeded for user.
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { household, loading: householdLoading } = useHousehold(props.householdId);
  const { affiliations, loading: affilationsLoading } = useAffiliations();
  const { householdChildren, loading: householdChildrenLoading } = useHouseholdChildren(props.householdId);
  const { householdAttachments, loadAttachments } = useHouseholdAttachments(props.householdId);

  if (householdLoading || affilationsLoading || householdChildrenLoading) {
    return null;
  }

  function onFileChange(files: FileList) {
    uploadAttachment({ id: household.id, files }).then(loadAttachments);
  }

  async function onAddressChange(name, value) {
    const latlng = { ...value.latlng };
    delete value.latlng;

    try {
      // TODO: Get CMPD Address Info
      //   const response = await getAddressInfo(latlng.lat, latlng.lng);
      //   const cmpdDivision = pathOr('', 'data.properties.DIVISION', response);
      //   const cmpdResponseArea = pathOr('', 'data.properties.RA', response);
      //   value.cmpdDivision = response.data.properties.DIVISION;
      //   value.cmpdResponseArea = response.data.properties.RA;
      //   value.type = household.address.type && household.address.type;
      // onChange(name, value);
    } catch (error) {
      console.error(error);
    }
  }

  const onSave = async ({ childNominations: children, household }) => {
    debugger;
    updateHousehold(household.id, household);
    updateHouseholdChildren(children);
  };

  const handleClose = () => setError({ showError: false, errorMessage: '', validationErrors: [] });

  const onSavedReject = () => {
    setShowConfirm(false);
  };

  const onSavedConfirm = () => {
    // reset();
    setShowConfirm(false);
  };

  const onSubmit = async () => {
    const { history } = props;

    const id = props.householdId || (household && household.id);
    const error = householdChildren.length === 0 && 'You must add at least one child to the household';

    if (error) {
      alert(error);
    }

    try {
      await submitNomination({ id });

      const redirectToList = props.match && props.match.params && props.match && props.match.params.id;

      if (redirectToList) {
        history.push('/dashboard/household');
      } else {
        setShowConfirm(true);
      }
    } catch (e) {
      const errorMessage =
        e.response.status === 403 ? 'You must add at least one child to the household' : 'Something went wrong';

      setError({
        showError: true,
        errorMessage,
        validationErrors: []
      });
    }
  };

  return (
    <div>
      {disabled && (
        <Alert bsStyle="warning">
          <strong>Sorry!</strong> Your nomination limit has been reached.
        </Alert>
      )}
      <HouseholdForm
        data={{ household, childNominations: householdChildren, files: householdAttachments }}
        onSubmit={onSubmit}
        onSave={onSave}
        onFileChange={onFileChange}
        affiliations={affiliations}
        onAddressChange={address => onAddressChange('address', address)}
        status={household.status}
        disabled={disabled}
        user={props.user}
      />
      <ErrorModal
        title="Oops - there's an error"
        message={error.errorMessage}
        validationErrors={error.validationErrors}
        show={error.showError}
        handleClose={handleClose}
      />

      <ConfirmModal
        show={showConfirm}
        rejectText="View nomination"
        confirmText="Create another"
        onReject={onSavedReject}
        onConfirm={onSavedConfirm}
      />
    </div>
  );
}

export default EditHousehold;
