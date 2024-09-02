import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdatePutCompanyDTO } from './dto/update-put-company.dto';
import { UpdatePatchCompanyDTO } from './dto/update-patch-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() { name }: CreateCompanyDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.companyService.create(name, file);
  }

  @Get()
  async list() {
    return this.companyService.list();
  }

  @Get(':id')
  async show(@ParamId() id: string) {
    return this.companyService.show(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put(':id')
  async update(
    @ParamId() id: string,
    @Body() { name }: UpdatePutCompanyDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.companyService.update(id, name, file);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async updatePartial(
    @ParamId() id: string,
    @Body() { name }: UpdatePatchCompanyDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.companyService.updatePartial(id, name, file);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.companyService.delete(id);
  }
}
