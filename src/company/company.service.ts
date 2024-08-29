import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdatePutCompanyDTO } from './dto/update-put-company.dto';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePatchCompanyDTO } from './dto/update-patch-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ name, logoUrl, fileName }: CreateCompanyDTO) {
    try {
      return this.prisma.company.create({
        data: { name, logoUrl, fileName },
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

  async update(id: string, { name, logoUrl, fileName }: UpdatePutCompanyDTO) {
    await this.exists(id);

    return this.prisma.company.update({
      data: {
        name,
        logoUrl,
        fileName,
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: string,
    { name, logoUrl, fileName }: UpdatePatchCompanyDTO,
  ) {
    await this.exists(id);
    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (logoUrl) {
      data.logoUrl = logoUrl;
    }

    if (fileName) {
      data.fileName = fileName;
    }
    return this.prisma.company.update({
      data,
      where: {
        id,
      },
    });
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
