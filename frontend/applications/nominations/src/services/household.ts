import db from './db';
import fs from './fs';

export function reviewHousehold(id, payload) {
  const { approved, reason, message } = payload;

  return db
    .collection('households')
    .doc(id)
    .update({
      approved,
      reason,
      message
    });
}

export function deleteNomination(id) {
  return db
    .collection('households')
    .doc(id)
    .delete();
}

export function createHousehold(json) {
  return db.collection('households').add(json);
}

export function updateHousehold(id, json) {
  return db
    .collection('households')
    .doc(id)
    .update(json);
}

export function submitNomination({ id }) {
  return db
    .collection('households')
    .doc(id)
    .update({
      draft: false
    });
}

export function uploadAttachment({ id, fileName, file }) {
  const fileRef = fs.ref().child(`attachments/${id}/${fileName}`);
  return fileRef.put(file);
}

export function deleteAttachment({ id, fileName }) {
  const fileRef = fs.ref().child(`attachments/${id}/${fileName}`);
  return fileRef.delete();
}

export type Household = {
  id: string;
  address: Address;
  approved: boolean;
  deleted: boolean;
  dob: string;
  draft: boolean;
  email: string;
  firstName: string;
  gender: string;
  last4ssn: string;
  lastName: string;
  middleName: string;
  nominationEmailSent: boolean;
  nominatorId: string;
  phoneNumbers: Phone[];
  preferredContactMethod: string;
  race: string;
  reviewed: boolean;
  status: HouseholdStatus;
};

export type Address = {
  city: string;
  householdId: string;
  state: string;
  street: string;
  street2: string;
  type: string;
  zip: string;
};

export type Phone = {
  householdId: number;
  number: string;
  type: string;
};

export enum HouseholdStatus {
  Drafted = 'DRAFTED',
  Submitted = 'SUBMITTED',
  Reviewed = 'REVIEWED',
  ReadyToApprove = 'READY_TO_APPROVE',
  Approved = 'APPROVED',
  Declined = 'DECLINED',
  Incomplete = 'INCOMPLETE'
}
