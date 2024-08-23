import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data)
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.show(id)
  }

  @Put(':id')
  async update(@Body() body, @Param('id', ParseUUIDPipe) id: string) {
    return this.userService.update(body, id);
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param('id', ParseUUIDPipe) id: string) {
    return this.userService.updatePartial(body, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}
