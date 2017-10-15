const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'us-west-1' });

const logger = require('./logger');

// AWS.config.loadFromPath('config.json');

const createMainBucket = async (name) => {
// Create the parameters for calling createBucket
  const bucketParams = { Bucket: name };

  try {
    return await s3.headBucket(bucketParams).promise();
  } catch (error) {
    logger.error(error);

    try {
      return await s3.createBucket(bucketParams).promise();
    } catch (error) {
      logger.error(error);
      throw error;

    }
  }
};

const createItemObject = async ({ name, filename, fileBuffer }) => {
  const params = {
    Bucket: name,
    Key: `${filename}`,
    ACL: 'public-read',
    Body: fileBuffer
  };

  try {
    logger.info('createItemObject');
    const data = await s3.putObject(params).promise();
    return data;
  } catch (error) {
    logger.error(error);

    throw error;
  }
};

module.exports = {
  createItemObject,
  createMainBucket
};