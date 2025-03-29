import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { User } from './bot/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GreetingBot } from './bot/entities/greeting-bot.entity';
import { Message } from './bot/entities/message.entity';
import { KeysMenu } from './bot/entities/keys-menu.entity';
import { MessageButtonsList } from './bot/entities/message-buttons-list.entity';
import { MessageButtons } from './bot/entities/message-buttons.entity';
import { ButtonSendMessage } from './bot/entities/buttons-send-message.entity';
import { ApiModule } from './api/api.module';
import { AdminUser } from './bot/entities/admin-user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [GreetingBot, User, Message, KeysMenu, MessageButtonsList, MessageButtons, ButtonSendMessage, AdminUser],
        synchronize: true, 
      }),
    }),
    BotModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}