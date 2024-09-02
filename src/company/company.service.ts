import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileService } from 'src/file/file.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(name: string, file: Express.Multer.File) {
    try {
      const dataFile = await this.fileService.uploadFileGc(file);

      return this.prisma.company.create({
        data: { name, logoUrl: dataFile.url, fileName: dataFile.originalName },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async list() {
    return this.prisma.company.findMany();
  }

  async show(id: string) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, name: string, file: Express.Multer.File) {
    try {
      await this.exists(id);
      const dataFile = await this.fileService.uploadFileGc(file);
      return this.prisma.company.update({
        data: {
          name,
          logoUrl: dataFile.url,
          fileName: dataFile.originalName,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePartial(id: string, name: string, file: Express.Multer.File) {
    try {
      await this.exists(id);
      const data: any = {};

      if (name && file) {
        const dataFile = await this.fileService.uploadFileGc(file);

        return this.prisma.company.update({
          data: {
            name,
            fileName: dataFile.originalName,
            logoUrl: dataFile.url,
          },
          where: {
            id,
          },
        });
      }

      if (name) {
        return this.prisma.company.update({
          data: {
            name,
          },
          where: {
            id,
          },
        });
      }

      if (file) {
        const dataFile = await this.fileService.uploadFileGc(file);

        return this.prisma.company.update({
          data: {
            fileName: dataFile.originalName,
            logoUrl: dataFile.url,
          },
          where: {
            id,
          },
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string) {
    return this.prisma.company.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.prisma.company.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('A empresa não existe');
    }
  }
}
