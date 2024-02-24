import {IConfigService} from "./config/config.interface";
import {Telegraf} from "telegraf";
import {ConfigService} from "./config/config.service";
import {IBotContext} from "./context/context.interface";
import {Command} from "./commands/command.class";
import {StartCommand} from "./commands/start.command";
import {GoodMorningCommand} from "./commands/goodMoning.command";
import {ComplimentsCommand} from "./commands/compliments.command";
import {GoodEveningCommand} from "./commands/goodEvening.command";

class Bot {
    bot: Telegraf<IBotContext>
    commands: Command[] = []
    job = require('node-schedule')


    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf(this.configService.get('TOKEN'))
    }

    init() {
        this.commands = [new StartCommand(this.bot), new GoodMorningCommand(this.bot), new ComplimentsCommand(this.bot), new GoodEveningCommand(this.bot)]

        for (const command of this.commands) {
            command.handle()
        }

        void this.bot.launch().then(() => {
            console.log("Start")
        })
    }
}

const configService = new ConfigService()
const bot = new Bot(configService)

bot.init()