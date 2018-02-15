// module.exports = (fun: () => Promise<void>) => {
module.exports = (fun) => {
  setTimeout(() => {
    fun().then(() => {}).catch((error) => {
      console.error('Unhandled error:', error);
      // TODO: log error to file
    });
  }, 0);
};
