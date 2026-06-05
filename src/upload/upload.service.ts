import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as crypto from 'crypto';

@Injectable()
export class UploadService {
  private readonly uploadDir = join(process.cwd(), 'uploads');

  async initializeUploadDir() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
    }
  }

  async saveFile(file: Express.Multer.File): Promise<{ filename: string; url: string }> {
    await this.initializeUploadDir();

    const ext = file.originalname.split('.').pop();
    const filename = `${crypto.randomBytes(16).toString('hex')}.${ext}`;
    const filepath = join(this.uploadDir, filename);

    await fs.writeFile(filepath, file.buffer);

    return {
      filename,
      url: `/uploads/${filename}`,
    };
  }

  async deleteFile(filename: string): Promise<void> {
    const filepath = join(this.uploadDir, filename);
    try {
      await fs.unlink(filepath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
