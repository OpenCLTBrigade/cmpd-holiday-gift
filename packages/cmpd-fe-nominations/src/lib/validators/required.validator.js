export default value => {
  if (value == null || value === '') {
    return Promise.reject('required');
  }

  return Promise.resolve('valid');
};
