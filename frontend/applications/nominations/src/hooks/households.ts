import React from 'react';
import db from '../services/db';

export function useHousehold(id) {
  const [error, setError] = React.useState<false | Error>(false);
  const [loading, setLoading] = React.useState(true);
  const [household, setHousehold] = React.useState<Household | undefined>();

  React.useEffect(() => {
    db
      .collection('households')
      .doc(id)
      .get()
      .then(doc => {
        const household = { id: doc.id, ...doc.data() };
        setHousehold(household as Household);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
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
