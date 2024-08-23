import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UUID } from 'crypto';
import { UpdatePutDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  async create(data: CreateUserDTO) {}

  async list() {}

  async show(id: string) {}

  async update(data: UpdatePutDTO, id: string) {}

  async updatePartial(data: UpdatePatchUserDTO, id: string) {}

  async delete(id: string) {}
}
