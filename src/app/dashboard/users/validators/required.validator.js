// @flow

export default value => {

  if (typeof value === 'undefined' || value === '' || value === null ) {
    return Promise.reject('required');
  } else {
    return Promise.resolve('valid');
  }

};
