import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GreetingController } from './controllers/greeting.controller';
import { GreetingBotService } from './services/greeting-bot.service';
import { GreetingBot } from '../bot/entities/greeting-bot.entity';
import { Message } from '../bot/entities/message.entity';
import { MessageButtonsList } from '../bot/entities/message-buttons-list.entity';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';
import { MessageButtons } from '../bot/entities/message-buttons.entity';
import { KeysMenu } from '../bot/entities/keys-menu.entity';
import { KeysMenuService } from './services/keys-menu.service';
import { KeysMenuController } from './controllers/keys-menu.controller';
import { User } from 'src/bot/entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AdminUser } from 'src/bot/entities/admin-user.entity';
import { AdminUserController } from './controllers/admin-user.controller';
import { AdminUserService } from './services/admin-user.service';
import { AdminAuthController } from './controllers/admin-auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GreetingBot, Message, MessageButtons, MessageButtonsList, KeysMenu, User, AdminUser])],
  controllers: [GreetingController, MessageController, KeysMenuController, UsersController, AdminUserController, AdminAuthController],
  providers: [GreetingBotService, MessageService, KeysMenuService, UsersService, AdminUserService],
})
export class ApiModule {}