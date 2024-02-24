import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";
import fs from "fs";
import {randomIntFromInterval} from "../utils/writeUserChatId";

export class GoodEveningCommand extends Command {
    job = require('node-schedule')

    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        const rule = new this.job.RecurrenceRule();
        rule.hour = 15;
        rule.minute = 0;


        this.job.scheduleJob(rule, () => {
            const data = fs.readFileSync('./file.json', {encoding: 'utf8'});
            const dataParse = JSON.parse(data)

            const dataMorning = fs.readFileSync('./good_evening.json', {encoding: 'utf8'});
            const dataMorningParse = JSON.parse(dataMorning)
            const randomMessage = randomIntFromInterval(0, dataMorningParse.length - 1)

            for (const id of dataParse) {
                void this.bot.telegram.sendMessage(id, `${dataMorningParse[randomMessage].text}❤️`);
                console.log(`Отпрваил пожелания спокойной ночи ${new Date()}`)
            }
        })
    }
}

