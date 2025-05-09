import { Message } from 'discord.js';
import * as fs from 'fs'
import { Weight } from '../weights/weight';
const settings_allowed = JSON.parse(fs.readFileSync("./data/allsettings.json", "utf-8"))

export function parseArguments(args: string[]) {
    // Valeurs par défaut
    let result = {
        ban: "",
        typeSeed: null,
        list: false,
        help: false
    };

    // Parcours du tableau pour assigner les valeurs
    args.forEach(arg => {
        if (arg.startsWith('ban=')) {
            result.ban = arg.slice(4)
        } else if (arg === 'list') {
            result.list = true
        } else if (arg === 'help') {
            result.help = true
        } else {
            result.typeSeed = arg
        }
    });

    return result;
}

export class CustomSeed {
    getRandomSettings(ban: string) {
        const banned = ban.split(';').filter(el => settings_allowed.includes(el));
        if(banned.length === 0) {
            return []
        }
        return banned;
    }

    getList() {
        return settings_allowed;
    }

    private loadVanilla() {
        return JSON.parse(fs.readFileSync("./custom_weights/rsl_vanilla.json", "utf-8"))
    }

    private loadRSL(weightFile: string) {
        return JSON.parse(fs.readFileSync("./custom_weights/" + weightFile, "utf-8"))
    }

    generateWeights(message: Message, argument: string, choices: string[]) {
        const weightFile = Weight.getWeightFile(message, argument)
        const vanilla = this.loadVanilla();
        const RSL = this.loadRSL(weightFile);
        for(let choice of choices) {
            RSL.weights[choice] = vanilla.weights[choice]
        }
        return RSL;
    }

    writeFile(filename, weights) {
        fs.writeFileSync('plando-random-settings/weights/' + filename, JSON.stringify(weights, null, 4))
    }

    rmFile(filename) {
        setTimeout(async () => {
            try {
                fs.unlinkSync('plando-random-settings/weights/' + filename)
            } catch (err) {
                console.error(err);
            }
        }, 1000);
    }
}