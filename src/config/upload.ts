interface ILimit {
  fileSize: number;
}
interface IMulter {
  limits: ILimit;
}

interface IUploadConfig {
  region: string;
  bucket: string;
  multer: IMulter;
}

export default {
  region: process.env.AWS_DEFAULT_REGION,
  bucket: process.env.BUCKET_NAME,
  multer: {
    limits: {
      fileSize: 8000000,
    },
  },
} as IUploadConfig;
