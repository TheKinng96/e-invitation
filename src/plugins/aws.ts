import aws from 'aws-sdk';

aws.config.update({
  secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY,
  accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
});

const s3 = new aws.S3({
  signatureVersion: 'v4',
  region: 'ap-northeast-1',
});

export default s3;