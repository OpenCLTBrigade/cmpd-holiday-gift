import React, { useState } from 'react';
import { useHouseholds } from '../../../hooks/households';
import { HouseholdTable } from './HouseholdTable';
import Box from '../components/box';
import { Row, Col } from 'react-bootstrap';
import { FeedbackModal } from './components/FeedbackModal';
import { deleteNomination } from '../../../services/household';

export function Households() {
  const { loading, households } = useHouseholds();
  const [householdInReview, setHouseholdInReview] = useState<object | undefined>(undefined);

  const openHouseholdReview = householdInReview => {
    setHouseholdInReview(householdInReview);
  };

  const closeHouseholdReview = () => {
    setHouseholdInReview(undefined);
  };

  if (loading) return <span>Loading...</span>;

  return (
    <div>
      <Row>
        <Col xs={12}>
          <Box title="Household List">
            {households && (
              <HouseholdTable
                households={households}
                handleDelete={deleteNomination}
                openHouseholdReview={openHouseholdReview}
              />
            )}
          </Box>
        </Col>
      </Row>
      <FeedbackModal household={householdInReview} doClose={closeHouseholdReview} />
    </div>
  );
}
