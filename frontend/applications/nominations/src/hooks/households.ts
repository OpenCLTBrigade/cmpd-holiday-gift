import React from 'react';
import db from '../services/db';

export function useHousehold(id) {
  const [error, setError] = React.useState<false | Error>(false);
  const [loading, setLoading] = React.useState(true);
  const [household, setHousehold] = React.useState<Household | undefined>();

  React.useEffect(() => {
    let unsubscribe: () => void;
    if (id) {
      unsubscribe = db
        .collection('households')
        .doc(id)
        .onSnapshot(
          snapshot => {
            const household = { id: snapshot.id, ...snapshot.data() };
            setHousehold(household as Household);
            setLoading(false);
          },
          err => {
            setError(err);
            setLoading(false);
          }
        );
    } else {
      const doc = db.collection('households').doc();
      const newHousehold: Household = {
        id: doc.id,
        approved: false,
        deleted: false,
        dob: '',
        draft: false,
        email: '',
        firstName: '',
        last4ssn: '',
        nominationEmailSent: false,
        lastName: '',
        gender: '',
        middleName: '',
        nominatorId: '',
        race: '',
        reviewed: false,
        preferredContactMethod: '',
        status: HouseholdStatus.Created,
        phoneNumbers: []
      };

      unsubscribe = doc.onSnapshot(
        snapshot => {
          const household = { id: snapshot.id, ...newHousehold, ...snapshot.data() };
          setHousehold(household as Household);
          setLoading(false);
        },
        err => {
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe && unsubscribe();
    }
  }, []);

  return {
    error,
    loading,
    household
  };
}

export function useHouseholds() {
  const [error, setError] = React.useState<false | Error>(false);
  const [loading, setLoading] = React.useState(true);
  const [households, setHouseholds] = React.useState<Household[]>([]);

  React.useEffect(() => {
    const unsubscribe = db.collection('households').onSnapshot(
      snapshot => {
        const households = [];
        snapshot.forEach(doc => {
          households.push({ id: doc.id, ...doc.data() });
        });
        setLoading(false);
        setHouseholds(households);
      },
      err => {
        setError(err);
      }
    );
    return () => unsubscribe();
  }, []);

  return {
    error,
    loading,
    households
  };
}

type Household = {
  id: string;
  address?: Address;
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
type Address = {
  city: string;
  householdId: string;
  state: string;
  street: string;
  street2: string;
  type: string;
  zip: string;
};
type Phone = {
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
