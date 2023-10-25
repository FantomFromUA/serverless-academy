import { envData } from './env-reader.js';
import TelegramBot from 'node-telegram-bot-api';
import { createForcastMessage, getForcast } from './utils.js';

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

var city = '';

const keyboardForCity = {
  reply_markup: {
    keyboard: [
      ['Forcast in Nice'],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

const keyboardForInterval = {
  reply_markup: {
    keyboard: [
      ['at intervals of 3 hours'],
      ['at intervals of 6 hours']
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Choose city', keyboardForCity);
  });

bot.onText(/Forcast in Nice/, (msg) => {
    const chatId = msg.chat.id;
    city = 'Nice'
    bot.sendMessage(chatId, 'Choose interval', keyboardForInterval);
});

bot.onText(/(at intervals of 3 hours|at intervals of 6 hours)/, async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    if(city === ''){
      bot.sendMessage(chatId, 'Pleace choose city before!');
      return;
    }

    let forecast = await getForcast('Nice', text.includes('6'));
    const message = createForcastMessage(forecast);

    bot.sendMessage(chatId, message, keyboardForCity);
});