import { envData } from './env-reader.js';
import TelegramBot from 'node-telegram-bot-api';
import NodeCache from 'node-cache';
import { createExchangeMessage} from './utils.js';
import axios from 'axios';
import { getExchangeRate } from './http.js';

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

const exchangeCache = new NodeCache({
    stdTTL: 60
});

const keyboard = {
    reply_markup: {
      keyboard: [
        ['USD'],
        ['EUR']
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
};

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Курс валюти', keyboard);
});

bot.onText(/USD|EUR/, async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if(exchangeCache.has(text)){
        bot.sendMessage(chatId, createExchangeMessage(text, exchangeCache.get(text)));
        return;
    }

    const exchangeRate = await getExchangeRate();
    exchangeCache.set('USD', exchangeRate[0]);
    exchangeCache.set('EUR', exchangeRate[1]);
    console.log(exchangeCache.get(text));

    bot.sendMessage(chatId, createExchangeMessage(text, exchangeCache.get(text)));
});