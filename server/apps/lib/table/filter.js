const Fuse = require('fuse.js');
const defaults = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1
};

module.exports = ({ list, keys, search }) => {
  const options = { ...defaults, keys };
  const fuse = new Fuse(list, options);
  return fuse.search(search);
};
