import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import { envData } from './env-reader.js';

const token = process.env.BOT_TOKEN;
const userId = process.env.USER_ID;

const bot = new TelegramBot(token, {polling: true});

export async function sendMessage(message){
    await bot.sendMessage(userId, message);
    process.exit(0);
}

export async function sendPhoto(photoDir){
    const photo = fs.readFileSync(photoDir);
    await bot.sendPhoto(userId, photo);
    process.exit(0);
}

