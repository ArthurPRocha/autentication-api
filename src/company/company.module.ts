import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [PrismaModule, FileModule],
})
export class CompanyModule {}
