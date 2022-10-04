const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET,
} = require("../utils/config");

AWS.config.update({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: AWS_REGION,
});

s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const uploadFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = uploadFile;
