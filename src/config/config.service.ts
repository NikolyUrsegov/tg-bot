import {config, DotenvParseOutput} from 'dotenv'
import {IConfigService} from "./config.interface";

export class ConfigService implements IConfigService {
    private readonly config: DotenvParseOutput

    constructor() {
        const {error, parsed} = config()

        if (error) {
            throw new Error('Ошибка')
        }
        if (!parsed) {
            throw new Error('Пусто')
        }

        this.config = parsed
    }

    get(key: string): string {
        const res = this.config[key]

        if (!res) throw new Error('Нет такого ключа')
        return res
    }
}