module.exports = promise => {
    promise.then(() => {}).catch((error) => {
        console.error('Unhandled error:', error);
        // TODO: log error to file
    });
};
