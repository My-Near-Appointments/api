import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/modules/shared/exception-filters/prisma-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Schedule API')
    .setDescription('The scheduler API')
    .setVersion('1.0')
    .addTag('user')
    .addTag('auth')
    .addTag('company')
    .addTag('employee')
    .addTag('employee-availability')
    .addTag('appointment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
