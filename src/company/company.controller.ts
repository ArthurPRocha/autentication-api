import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { UpdatePutCompanyDTO } from './dto/update-put-company.dto';
import { UpdatePatchCompanyDTO } from './dto/update-patch-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @Post()
  async create(@Body() data: CreateCompanyDTO) {
    return this.companyService.create(data);
  }

  @Get()
  async list() {
    return this.companyService.list();
  }

  @Get(':id')
  async show(@ParamId() id: string) {
    return this.companyService.show(id);
  }

  @Put(':id')
  async update(@ParamId() id: string, @Body() data: UpdatePutCompanyDTO) {
    return this.companyService.update(id,data)
  }

  @Patch(':id')
  async updatePartial(@ParamId() id: string, @Body() data: UpdatePatchCompanyDTO) {
    return this.companyService.updatePartial(id,data)
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return this.companyService.delete(id)
  }
}
