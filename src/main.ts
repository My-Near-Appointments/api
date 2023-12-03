import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/modules/shared/exception-filters/prisma-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(helmet());
  app.use(compression());

  app.enableShutdownHooks();

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
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  async function gracefulShutdown(signal: NodeJS.Signals) {
    await app.close();
    process.kill(process.pid, signal);
  }

  process.on('SIGINT', gracefulShutdown);

  await app.listen(3000);
}

bootstrap();
