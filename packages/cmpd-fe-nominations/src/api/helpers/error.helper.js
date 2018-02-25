export const parseValidationErrors = (errors = [], parentProperty = '') => {
  return errors.reduce((done, { children = [], property, constraints }) => {
    if (Array.isArray(children) && children.length > 0) {
      return done.concat(parseValidationErrors(children, property));
    } else {
      return done.concat({ property: [parentProperty, property].filter(Boolean).join('.'), constraints });
    }
  }, []);
};
