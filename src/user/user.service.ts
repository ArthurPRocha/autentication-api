import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {}

  async list() {}

  async show(id: string) {}

  async update(data: UpdatePutDTO, id: string) {}

  async updatePartial(data: UpdatePatchUserDTO, id: string) {}

  async delete(id: string) {}
}
