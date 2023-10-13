import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CompanyModule } from 'src/modules/company/company.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [CompanyModule],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
