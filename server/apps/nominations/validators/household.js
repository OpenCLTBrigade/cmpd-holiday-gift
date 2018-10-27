// @flow

const { check } = require("express-validator/check");

const firstName = check("household.name_first").exists();
const lastName = check("household.name_last").exists();
const dob = check("household.dob").exists();
const race = check("household.race").exists();
const gender = check("household.gender").exists();
// const email = check('household.email').exists();
const last4ssn = check("household.last4ssn").exists();
const preferredContact = check("household.preferred_contact_method").exists();
const reason_for_nomination = check("household.reason_for_nomination").exists();

const addressLine1 = check("address.street").exists();
const city = check("address.city").exists();
const state = check("address.state").exists();
const zip = check("address.zip").exists();
// const division = check('address.cmpd_division').exists();
// const responseArea = check('address.cmpd_response_area').exists();
const deliveryAddressType = check("address.type").exists();

const number = check("phoneNumbers.*.number").exists();
const type = check("phoneNumbers.*.type").exists();

const nominationFirsName = check("nominations.*.name_first").exists();
const nominationLastName = check("nominations.*.name_last").exists();
const nominationDob = check("nominations.*.dob").exists();
const nominationEthnicity = check("nominations.*.race").exists();
const nominationGender = check("nominations.*.gender").exists();
const nominationSchool = check("nominations.*.school_id").exists();
const nominationSsn = check("nominations.*.last4ssn").exists();
const nominationHasLunch = check(
  "nominations.*.free_or_reduced_lunch"
).exists();
const clothes_size_pants = check("nominations.*.clothes_size_pants").optional();
const clothes_size_shirt = check("nominations.*.clothes_size_shirt").optional();
const clothes_size_coat = check("nominations.*.clothes_size_coat").optional();
const shoe_size = check("nominations.*.shoe_size").optional();
const clothes_want = check("nominations.*.clothes_want").optional();
const favourite_colour = check("nominations.*.favourite_colour").optional();
const additional_ideas = check("nominations.*.additional_ideas").optional();
const bike_size = check("nominations.*.bike_size").optional();
const bike_want = check("nominations.*.bike_want").optional();
const bike_style = check("nominations.*.bike_style").optional();
const interests = check("nominations.*.interests").optional();

module.exports = [
  firstName,
  lastName,
  dob,
  race,
  gender,
  last4ssn,
  preferredContact,
  addressLine1,
  city,
  state,
  zip,
  deliveryAddressType,
  number,
  type,
  clothes_size_coat,
  clothes_size_pants,
  clothes_size_shirt,
  clothes_want,
  favourite_colour,
  additional_ideas,
  bike_size,
  bike_style,
  bike_want,
  reason_for_nomination,
  interests,
  nominationDob,
  nominationFirsName,
  nominationLastName,
  nominationEthnicity,
  nominationGender,
  nominationSchool,
  nominationSsn,
  nominationHasLunch,
  clothes_size_pants,
  shoe_size
];
