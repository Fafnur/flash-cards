/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const globalPrefix = await configService.get('prefix');

  app.setGlobalPrefix(globalPrefix);
  const port = configService.get('port');
  await app.listen(port);

  Logger.log(`Listening at http://localhost:${port}${globalPrefix ? '/' + globalPrefix : ''}`);
}

void bootstrap();
