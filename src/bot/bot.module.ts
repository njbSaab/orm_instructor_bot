import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotUpdate } from './updates/bot.update';
import { BotHearsUpdate } from './keyboards/bot-hears.update';
import { GreetingBotService } from './services/greeting-bot.service';
import { UsersService } from './services/users.service';
import { GreetingBot } from './entities/greeting-bot.entity';
import { User } from './entities/user.entity';
import { Message } from './entities/message.entity';
import { KeysMenu } from './entities/keys-menu.entity';
import { MessageButtonsList } from './entities/message-buttons-list.entity';
import { MessageButtons } from './entities/message-buttons.entity';
import { ButtonSendMessage } from './entities/buttons-send-message.entity';
import { KeysMenuService } from './services/keys-menu.service';
import { MessageService } from './services/message.service';
import { MessageButtonsService } from './services/message-buttons.service';
import { ButtonSendMessageService } from './services/button-send-message.service';

// ButtonSendMessage

@Module({
  imports: [
    ConfigModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
      }),
    }),
    TypeOrmModule.forFeature([GreetingBot, User, Message, KeysMenu, MessageButtonsList, MessageButtons, ButtonSendMessage]), // Добавлено для регистрации репозиториев
  ],
  providers: [BotUpdate, BotHearsUpdate, GreetingBotService, UsersService, KeysMenuService, MessageService, MessageButtonsService, ButtonSendMessageService],
})
export class BotModule {}


