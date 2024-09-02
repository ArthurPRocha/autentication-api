import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  private readonly storage: Storage;
  constructor() {
    const projectId = process.env.PROJECT_ID;
    const keyFilename = process.env.KEY_FILE;

    this.storage = new Storage({
      projectId: projectId,
      keyFilename: keyFilename,
    });
  }

  async uploadFileGc(file: Express.Multer.File) {
    try {
      console.log(file)
      const bucketName = process.env.BUCKET_NAME;
      const bucket = this.storage.bucket(bucketName);
      const originalName = file.originalname;
      const fileName = `${uuidv4()}-${file.originalname}`;
      await bucket.file(fileName).save(file.buffer);

      const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;

      return { originalName, url };
    } catch (error) {
      console.error('Error uploading file to Google Cloud Storage:', error);
    }
  }
}
