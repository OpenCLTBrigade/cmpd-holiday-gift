export const parseValidationErrors = (errors = [], parentProperty = '') => {
  return errors.reduce((done, { children = [], property, constraints }) => {
    if (Array.isArray(children) && children.length > 0) {
      return done.concat(parseValidationErrors(children, property));
    } else {
      return done.concat({ property: [parentProperty, property].filter(Boolean).join('.'), constraints });
    }
  }, []);
};

export function missingProperty(param, { throwError, defaultVal }) {
  const message = `Missing property, "${param}" is missing.`;

  console.warn(message);

  if (throwError) {
    const missingPropertyError = new Error(message);
    // preserve original stack trace
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(requiredParamError, requiredParam);
    }
    throw missingPropertyError;
  }

  return defaultVal;
}
