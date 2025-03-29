import { Update, Ctx, Hears, On } from 'nestjs-telegraf';
import { Inject } from '@nestjs/common';
import { Context } from 'telegraf';
import { mainMenuKeyboard, childMenu, childNextMenu } from '../keyboards/menu.keyboard';
import { KeysMenuService } from '../services/keys-menu.service';
import { MessageService } from '../services/message.service';
import { MessageButtonsService } from '../services/message-buttons.service';
import { ButtonSendMessageService } from '../services/button-send-message.service';

@Update()
export class BotHearsUpdate {
  constructor(
    @Inject(KeysMenuService) private readonly keysMenuService: KeysMenuService,
    @Inject(MessageService) private readonly messageService: MessageService,
    @Inject(MessageButtonsService) private readonly messageButtonsService: MessageButtonsService,
    @Inject(ButtonSendMessageService) private readonly buttonSendMessageService: ButtonSendMessageService,
  ) {}

  @Hears([
    'Pradictions ⚽️',
    'Info 🎯',
    'SecondMenu 🚀',
    'SecondMenu 1 🔎',
    'SecondMenu 2 💫',
    'ThirdMenu 3',
    'ThirdMenu 1 🔎',
    'ThirdMenu 2 🔎',
    'ThirdMenu 3 🔎',
    '⬅️ Back',
  ])
  async handleMenuButton(@Ctx() ctx: Context) {
    const buttonName = (ctx.message as any)?.text;
    const button = await this.keysMenuService.getButtonByName(buttonName);

    if (!button) {
      await ctx.reply('Button not found.');
      return;
    }

    //* 1. Если у кнопки есть linkedPostId, показываем сообщение
    if (button.linkedPostId) {
      const message = await this.messageService.getMessageById(button.linkedPostId); // Используем linkedPostId напрямую
      if (message) {
        const buttons = await this.messageButtonsService.getButtonsForMessage(message.id);
        const inlineKeyboard = buttons.map((btn) => [
          btn.url
            ? { text: btn.name, url: btn.url }
            : { text: btn.name, callback_data: `btn_${btn.id}` },
        ]);

        if (message.message_image_url) {
          await ctx.replyWithPhoto(message.message_image_url, {
            caption: message.message_content || '',
            reply_markup: inlineKeyboard.length ? { inline_keyboard: inlineKeyboard } : undefined,
          });
        } else {
          await ctx.reply(message.message_content || 'Message is empty.', {
            reply_markup: inlineKeyboard.length ? { inline_keyboard: inlineKeyboard } : undefined,
          });
        }
      } else {
        await ctx.reply('Message not found.');
      }
      return;
    }

    //* 2. Логика для кнопок без linkedPostId
    if (buttonName === 'SecondMenu 🚀') {
      await ctx.reply('Here is Menu 2:', childMenu);
    } else if (buttonName === 'ThirdMenu 3') {
      await ctx.reply('Here is Menu 3:', childNextMenu);
    } else if (buttonName === '⬅️ Back') {
      const parentId = button.parentId || null;
      if (parentId) {
        const parentButton = await this.keysMenuService.getButtonById(parentId);
        const parentLevel = parentButton?.levelMenu || 0;

        if (parentLevel === 0) {
          await ctx.reply('Main Menu:', mainMenuKeyboard);
        } else if (parentLevel === 2) {
          await ctx.reply('Here is Menu 2:', childMenu);
        } else {
          await ctx.reply('Main Menu:', mainMenuKeyboard);
        }
      } else {
        await ctx.reply('Main Menu:', mainMenuKeyboard);
      }
    } else {
      await ctx.reply('This feature is under development.');
    }
  }

  @On('callback_query')
  async onCallbackQuery(@Ctx() ctx: Context) {
    const callbackQuery = ctx.callbackQuery;
    const callbackData = 'data' in callbackQuery ? callbackQuery.data : undefined;
    if (!callbackData || !callbackData.startsWith('btn_')) {
      await ctx.answerCbQuery('Invalid data.');
      return;
    }

    const buttonId = parseInt(callbackData.replace('btn_', ''), 10);
    const button = await this.messageButtonsService.getButtonById(buttonId);

    if (!button) {
      await ctx.reply('Button not found.');
      await ctx.answerCbQuery();
      return;
    }

    if (!button.url) {
      const bsm = await this.buttonSendMessageService.getMessageByButtonId(buttonId);
      if (bsm && bsm.message) {
        if (bsm.message.message_image_url) {
          await ctx.replyWithPhoto(bsm.message.message_image_url, {
            caption: bsm.message.message_content || '',
          });
        } else {
          await ctx.reply(bsm.message.message_content || 'Message is empty.');
        }
      } else {
        await ctx.reply('Message not found.');
      }
    } else if (button.url) {
      await ctx.reply(`Here is your link: ${button.url}`);
    }

    await ctx.answerCbQuery();
  }
}