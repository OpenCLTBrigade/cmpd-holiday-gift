import * as Fuse from 'fuse.js';

const defaults = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1
};

export default ({ list, keys, search }) => {
  const options = { ...defaults, keys };
  const fuse = new Fuse(list, options);
  return fuse.search(search);
};
