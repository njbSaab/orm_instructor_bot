import { Update, Start, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { mainMenuKeyboard } from '../keyboards/menu.keyboard';
import { GreetingBotService } from '../services/greeting-bot.service';
import { UsersService } from '../services/users.service';

@Update()
export class BotUpdate {
  constructor(
    private readonly greetingBotService: GreetingBotService,
    private readonly usersService: UsersService,
  ) {}

  @Start()
  async startCommand(@Ctx() ctx: Context) {
    console.log('[BotService] Получена команда /start');

    // Находим или создаём пользователя на основе данных из ctx.message.from
    const user = await this.usersService.findOrCreateUser(ctx.message?.from);
    console.log('[BotService] Пользователь добавлен/обновлён:', user);

    // Получаем все приветственные сообщения из базы данных
    const greetings = await this.greetingBotService.getAllGreetings();
    for (const greeting of greetings) {
      // Персонализируем текст, заменяя [Name] на имя пользователя (если есть)
      const personalizedText = greeting.greeting_text.replace('[Name]', user.first_name || 'there');
      
      // Если задан URL изображения, отправляем фото с подписью, иначе отправляем текстовое сообщение
      if (greeting.image_url) {
        await ctx.replyWithPhoto(greeting.image_url, { caption: personalizedText });
      } else {
        await ctx.reply(personalizedText);
      }
      
      // Задержка между отправкой сообщений (2500 мс)
      await new Promise(resolve => setTimeout(resolve, 2500));
    }

    // После приветственных сообщений отправляем основное меню
    await ctx.reply(`👇 ${user.username}, Выберите в меню 👇`, mainMenuKeyboard);
  }
}