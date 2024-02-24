import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import fs from "fs";
import axios from "axios";

export class ComplimentsCommand extends Command {
    job = require('node-schedule')

    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    async handleCompliment(): Promise<string> {
        try {
            let formData = new FormData();
            formData.append('type', 'compliment');
            formData.append('rod', 'female');
            formData.append('count', '1');

            return await axios.post('https://generatom.com/ajax/main', formData)
                .then((res) => {
                    return res.data[0].content.replace('\r\n', '')
                })
        } catch (e) {
            return Promise.reject(e)
        }
    }

    handle(): void {
        let hour = [5, 8, 12, 15];
        let minute = [0, 0, 0, 0];

        for (let i = 0; i < hour.length; i++) {
            let rule = new this.job.RecurrenceRule();
            rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
            rule.hour = hour[i];
            rule.minute = minute[i];

            this.job.scheduleJob(rule, async () => {
                try {
                    const data = fs.readFileSync('./file.json', {encoding: 'utf8'});
                    const dataParse = JSON.parse(data)

                    const message = await this.handleCompliment()
                    for (const id of dataParse) {
                        void this.bot.telegram.sendMessage(id, `${message}❤️`);
                    }
                } catch (e) {
                    console.log('упал комплимент')
                }
            });
        }

        this.bot.command('compliment', async (ctx) => {
            const message = await this.handleCompliment()
            void this.bot.telegram.sendMessage(ctx.chat.id, `${message}❤️`);
        })
    }
}