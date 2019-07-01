import React from 'react';
import db from '../services/db';

type Affiliation = {
  id: string;
  city: string;
  name: string;
  state: string;
  street: string;
  type: string;
  zip: number;
};

export function useAffiliations() {
  const [error, setError] = React.useState<false | Error>(false);
  const [loading, setLoading] = React.useState(true);
  const [affiliations, setAffiliations] = React.useState<Affiliation[]>([]);

  React.useEffect(() => {
    const unsubscribe = db.collection('affiliations').onSnapshot(
      snapshot => {
        const affiliations = [];
        snapshot.forEach(doc => {
          affiliations.push({ id: doc.id, ...doc.data() });
        });
        setLoading(false);
        setAffiliations(affiliations);
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
    affiliations
  };
}
