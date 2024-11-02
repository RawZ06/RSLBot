import * as fs from 'node:fs'
import { Message } from "discord.js";
const settings = JSON.parse(fs.readFileSync("./data/commands.json", "utf-8"))

export class Weight {
    static getWeightMessage(argument: string): string {
        const foundSeed = argument ? settings.seed.find(seed => seed.argument === argument) : settings.seed.find(seed => seed.argument === null);
    
        if (foundSeed) {
            return foundSeed.name;
        }
    
        const possibleArgs = settings.seed
            .map(seed => seed.argument || 'nothing')
            .join(', ');
        
        throw new Error(`Type ${argument || 'nothing'} unknown, please regenerate with one of the following arguments: ${possibleArgs}`);
    }

    static getWeightFile(message: Message, argument: string): string | null {
        const foundSeed = argument ? settings.seed.find(seed => seed.argument === argument) : settings.seed.find(seed => seed.argument === null);
    
        if (foundSeed) {
            return foundSeed.file;
        }
    
        const possibleArgs = settings.seed
            .map(seed => seed.argument || 'nothing')
            .join(', ');
    
        message.channel.send(`Type ${argument || 'nothing'} unknown, please regenerate with one of the following arguments: ${possibleArgs}`);
        
        throw new Error(`Type ${argument || 'nothing'} unknown, please regenerate with one of the following arguments: ${possibleArgs}`);
    }

    static getDeprecated(argument: string): string | null {
        const foundSeed = argument ? settings.seed.find(seed => seed.argument === argument) : settings.seed.find(seed => seed.argument === null);
    
        if (foundSeed) {
            return foundSeed.deprecated;
        }
    
        const possibleArgs = settings.seed
            .map(seed => seed.argument || 'nothing')
            .join(', ');
        
        throw new Error(`Type ${argument || 'nothing'} unknown, please regenerate with one of the following arguments: ${possibleArgs}`);
    }

    static getWarning(argument: string): string | null {
        const foundSeed = argument ? settings.seed.find(seed => seed.argument === argument) : settings.seed.find(seed => seed.argument === null);
    
        if (foundSeed) {
            return foundSeed.warning;
        }
    
        const possibleArgs = settings.seed
            .map(seed => seed.argument || 'nothing')
            .join(', ');
        
        throw new Error(`Type ${argument || 'nothing'} unknown, please regenerate with one of the following arguments: ${possibleArgs}`);
    }
}