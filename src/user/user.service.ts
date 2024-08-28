import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password, companyId }: CreateUserDTO) {
    try {
      const userExist = await this.prisma.user.count({
        where: { email },
      });

      if (userExist) {
        throw new BadRequestException('Usuário já existe.');
      }
      const hashPassword = await bcrypt.hash(password, 10);

      return this.prisma.user.create({
        data: {
          email,
          password: hashPassword,
          name,
          companyId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, { email, password, name }: UpdatePutUserDTO) {
    await this.exists(id);

    const hashPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.update({
      data: { email, password: hashPassword, name },
      where: {
        id,
      },
    });
  }

  async updatePartial(
    id: string,
    { email, name, password }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);
    const data: any = {};

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      data.password = hashPassword;
    }

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    await this.exists(id);
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: string) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException('O usuário não existe');
    }
  }
}
