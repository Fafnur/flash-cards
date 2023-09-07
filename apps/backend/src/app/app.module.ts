import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

import { AuthModule } from '@flashcards/backend/auth';
import { CardModule } from '@flashcards/backend/cards';
import { GroupModule } from '@flashcards/backend/groups';
import { UsersModule } from '@flashcards/backend/users';

import { AppController } from './app.controller';
import { configurationFactory, mailFactory, typeOrmFactory } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      load: [configurationFactory],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmFactory,
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: mailFactory,
    }),
    AuthModule,
    UsersModule,
    CardModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
