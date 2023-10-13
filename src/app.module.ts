import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CompanyController } from 'src/modules/company/controllers/company.controller';

@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [AppService],
})
export class AppModule {}
