import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {IBotContext} from "../context/context.interface";

export class GoodEveningCommand extends Command {
    job = require('node-schedule')

    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {


        // this.job.scheduleJob('*/10 * * * * *', () => {
        //     void this.bot.telegram.sendMessage(683759469, 'test');
        // })
    }
}