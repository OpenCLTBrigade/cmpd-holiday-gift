import db from './db';

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

export function uploadAttachment({ id, file }) {
  const formData = new FormData();
}
