#!/usr/bin/env node

import { Command } from 'commander';
import { sendMessage, sendPhoto } from './telegram-chat.js';

const program = new Command();

program
    .name('app')
    .version('1.0.0');

program
    .command('send-message')
    .description('Send message to Telegram Bot')
    .argument('<message>')
    .action((str, options) => {
        sendMessage(str);
    });

program.command('send-photo')
    .description('Send photo to Telegram Bot. Just drag and drop it consile after p-flag.')
    .argument('<path>')
    .action((str, options) => {
        sendPhoto(str);
    });


program.parse();