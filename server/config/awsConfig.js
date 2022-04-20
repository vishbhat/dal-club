// @Author: Vishwanath Suresh
const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

module.exports = {s3};