// src/bot/keyboards/menu.keyboard.ts
import { Markup } from 'telegraf';

export const mainMenuKeyboard = Markup.keyboard([
  ['Pradictions ⚽️'],
  ['Info 🎯'],
  ['SecondMenu 🚀'],
]).resize();

export const childMenu = Markup.keyboard([
  ['SecondMenu 1 🔎', 'SecondMenu 2 💫', 'ThirdMenu 3'],
  ['⬅️ Back']
]).resize();

export const childNextMenu = Markup.keyboard([
  ['ThirdMenu 1 🔎', ],
  ['ThirdMenu 2 🔎', ],
  ['ThirdMenu 3 🔎', ],
  
  // 'ThirdMenu 2 💫', 'ThirdMenu 3 📰'
  ['⬅️ Back']
]).resize();