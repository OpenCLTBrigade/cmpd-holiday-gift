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

export function updateHousehold(id, json: Household) {
  const household = {
    ...json,
    status: json.status === HouseholdStatus.Created ? HouseholdStatus.Drafted : json.status
  };
  return db
    .collection('households')
    .doc(id)
    .set(household);
}

export function updateHouseholdChildren(householdChildren: HouseholdChild[]) {
  const batch = db.batch();

  for (const child of householdChildren) {
    var ref = db.collection('household_children').doc(child.id);

    batch.set(ref, child);
  }

  return batch.commit();
}

export function submitNomination({ id }) {
  return db
    .collection('households')
    .doc(id)
    .update({
      draft: false,
      status: HouseholdStatus.Submitted
    });
}

export async function getAttachments(id: string) {
  const listResults = await fs.ref(`attachments/${id}`).listAll();
  const files = await Promise.all(
    listResults.items.map(item => item.getDownloadURL().then(url => ({ name: item.name, url })))
  );

  return files;
}

export function uploadAttachment({ id, files }: { id: string; files: FileList }) {
  for (const file of Array.from(files)) {
    const metadata = {
      contentType: file.type
    };
    const fileRef = fs.ref().child(`attachments/${id}/${file.name}`);
    return fileRef.put(file, metadata);
  }
}

export function deleteAttachment({ id, fileName }: { id: string; fileName: string }) {
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
  Created = 'CREATED',
  Drafted = 'DRAFTED',
  Submitted = 'SUBMITTED',
  Reviewed = 'REVIEWED',
  ReadyToApprove = 'READY_TO_APPROVE',
  Approved = 'APPROVED',
  Declined = 'DECLINED',
  Incomplete = 'INCOMPLETE'
}

type HouseholdChild = {
  id: string;
  schoolId?: string;
  bikeSize: string;
  bikeStyle: string;
  clothesCoatSize: string;
  clothesPantsSize: string;
  clothesShirtSize: string;
  dob: string;
  favouriteColor: string;
  firstName: string;
  freeOrReducedLunch: boolean;
  gender: boolean;
  householdId: string;
  interests: string;
  last4ssn: string;
  lastName: string;
  middleName: string;
  race: string;
  reasonForNomination: string;
  shoeSize: string;
  wantsBike: boolean;
  wantsClothes: boolean;
};
