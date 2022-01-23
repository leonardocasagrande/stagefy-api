import uploadConfig from '@config/upload';
import AppError from '@shared/errors/appError';
import aws, { S3 } from 'aws-sdk';
import crypto from 'crypto';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: uploadConfig.region,
    });
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    const ContentType = file.mimetype;

    if (!ContentType) {
      throw new Error('File not found.');
    }

    const hash = crypto.randomBytes(16);
    const fileName = `${hash.toString('hex')}-${file.originalname}`;
    try {
      await this.client
        .putObject({
          Bucket: uploadConfig.bucket,
          Key: fileName,
          ACL: 'public-read',
          Body: file.buffer,
          ContentType,
        })
        .promise();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw new AppError(
        'Erro ao salvar a imagem.',
        500,
        `Error on S3 save file: ${error}`,
      );
    }

    return `https://${uploadConfig.bucket}.s3.amazonaws.com/${fileName}`;
  }
}

export default S3StorageProvider;
