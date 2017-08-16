// @flow

export default value => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return Promise.reject('required');
  }

  return Promise.resolve('valid');
};
