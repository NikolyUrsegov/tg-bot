const fs = require('fs');

export const addChatId = (path: string, chatId: number) => {
    // @ts-ignore
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const obj = JSON.parse(data);
            obj.push(chatId);
            const json = JSON.stringify(obj);
            fs.writeFile('./file.json', json, 'utf8', () => {
            });
        }
    });
}

export const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}