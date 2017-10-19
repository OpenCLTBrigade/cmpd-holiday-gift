// @flow

export default (value: ?string): Promise<string> => {
  if (value == null || value === '') {
    return Promise.reject('required');
  }

  return Promise.resolve('valid');
};
