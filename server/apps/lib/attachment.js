const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'us-west-1', signatureVersion: 'v4' });

const logger = require('./logger');

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

const createAttachment = async ({ name, filename, fileBuffer }) => {
  const params = {
    Bucket: name,
    Key: `${filename}`,
    ACL: 'public-read',
    Body: fileBuffer
  };

  try {
    logger.info('createAttachment - uploading file', { bucket: name });
    const data = await s3.putObject(params).promise();

    logger.info('createAttachment - uploaded file');

    return data;
  } catch (error) {
    logger.error('something bad happened', error);

    throw error;
  }
};

const getAttachmentUrl = async ({ name, filename }) => {
  logger.info('getAttachmentUrl', { name, filename });

  const params = {
    Bucket: name,
    Key: `${filename}`
  };

  return await s3.getSignedUrl('getObject', params);
};

const getAttachments = async ({ name, owner }) => {
  logger.info('getAttachments', { name, owner });

  const params = { Bucket: name, Prefix: `${owner}/` };
  logger.info('getAttachments - retrieving list');

  const { Contents: contents } = await s3.listObjectsV2(params).promise();
  const uploads = [];
  logger.info('getAttachments - retreieved list', contents);

  for (let i = 0; i < contents.length; i++) {
    const filename = contents[i].Key;
    const url = await getAttachmentUrl({ name, filename });

    uploads.push({ filename: filename.replace(`${owner}/`, ''), url });
  }

  return uploads;
};

module.exports = {
  createAttachment,
  createMainBucket,
  getAttachmentUrl,
  getAttachments
};