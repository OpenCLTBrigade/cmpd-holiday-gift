import React from 'react';
import db from '../services/db';

export function useHouseholdChildren(id?) {
  const [error, setError] = React.useState<false | Error>(false);
  const [loading, setLoading] = React.useState(true);
  const [householdChildren, setHouseholdChildren] = React.useState<Child[]>([]);

  React.useEffect(
    () => {
      let unsubscribe;
      if (id) {
        const query = db.collection('household_children').where('householdId', '==', id);

        unsubscribe = query.onSnapshot(
          snapshot => {
            const householdChildren = [];
            snapshot.forEach(doc => {
              householdChildren.push({ id: doc.id, ...doc.data() });
            });
            setHouseholdChildren(householdChildren);
            setLoading(false);
          },
          err => {
            setError(err);
          }
        );
      } else {
        setHouseholdChildren([]);
        setLoading(false);
      }
      return () => unsubscribe && unsubscribe();
    },
    [id]
  );

  return {
    error,
    loading,
    householdChildren
  };
}

type Child = {
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
