import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import axios from "axios";
import fs from "fs";

export class StartCommand extends Command {
    job = require('node-schedule')

    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handleCompliment(chatId: number): void {
        let formData = new FormData();
        formData.append('type', 'compliment');
        formData.append('rod', 'female');
        formData.append('count', '1');

        axios.post('https://generatom.com/ajax/main', formData)
            .then((res) => {
                void this.bot.telegram.sendMessage(chatId, `${res.data[0].content.replace('\r\n', '')}❤️`)
            })
    }

    writeUserChatId(chatId: number): void {
        const data = fs.readFileSync('./file.json', {encoding: 'utf8'});
        const dataParse = JSON.parse(data)
        if (!dataParse.find((id: number) => id === chatId)) {
            fs.writeFileSync('./file.json', JSON.stringify([...dataParse, chatId]))
        } else {
            console.log('Такой юзер уже есть')
        }
    }

    handle(): void {
        this.bot.start(async (ctx) => {
            const chatId = ctx.chat.id

            await this.bot.telegram.sendMessage(chatId, "Привет, меня сделал Коля!\n\nЯ нужен для одной цели, чтобы каждый день радовать тебя комплиментами!");
            await this.bot.telegram.sendMessage(chatId, "Пока я очень глупый и умею общаться только с тобой ❤️\nНе делись пожалуйста мной ни с кем 🥰");

            await this.handleCompliment(chatId)

            this.writeUserChatId(chatId)
        })
    }
}