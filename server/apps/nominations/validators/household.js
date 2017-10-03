// @flow

const { check } = require('express-validator/check');

const firstName = check('household.name_first').exists();
const lastName = check('household.name_last').exists();
const dob = check('household.dob').exists();
const race = check('household.race').exists();
const gender = check('household.gender').exists();
const email = check('household.email').exists();
const last4ssn = check('household.last4ssn').exists();
const preferredContact = check('household.preferred_contact_method').exists();

const addressLine1 = check('address.street').exists();
const city = check('address.city').exists();
const state = check('address.state').exists();
const zip = check('address.zip').exists();
const division = check('address.cmpd_division').exists();
const responseArea = check('address.cmpd_response_area').exists();
const deliveryAddressType = check('address.type').exists();

const number = check('phoneNumbers.*.number').exists();
const type = check('phoneNumbers.*.type').exists();

const nominationFirsName = check('nominations.*.name_first').exists();
const nominationLastName = check('nominations.*.name_last').exists();
const nominationDob = check('nominations.*.dob').exists();
const nominationEthnicity = check('nominations.*.race').exists();
const nominationGender = check('nominations.*.gender').exists();
const nominationSchool = check('nominations.*.school_id').exists();
const nominationSsn = check('nominations.*.last4ssn').exists();

module.exports = [
  firstName,
  lastName,
  dob,
  race,
  gender,
  email,
  last4ssn,
  preferredContact,
  addressLine1,
  city,
  state,
  zip,
  division,
  responseArea,
  deliveryAddressType,
  number,
  type,
  nominationDob,
  nominationFirsName,
  nominationLastName,
  nominationEthnicity,
  nominationGender,
  nominationSchool,
  nominationSsn
];
