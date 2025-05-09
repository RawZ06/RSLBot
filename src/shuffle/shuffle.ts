import * as fs from 'fs'
const settings_allowed = JSON.parse(fs.readFileSync("./data/settings.json", "utf-8"))

export function parseArguments(args: string[]) {
    // Valeurs par défaut
    let result = {
        count: 5,
        noOutput: false,
        weight: false
    };

    // Parcours du tableau pour assigner les valeurs
    args.forEach(arg => {
        if (typeof arg === 'string' && /^\d+$/.test(arg)) {
            result.count = parseInt(arg, 10);
        } else if (arg === 'no-output') {
            result.noOutput = true;
        } else if (arg === 'weights') {
            result.weight = true;
        }
    });

    return result;
}

export class Shuffle {
    getRandomSettings(n) {
        if(n > settings_allowed.length) {
            return null;
        }
        const weightedList = [] as Array<string|string[]>;
        settings_allowed.forEach(setting => {
            const count = setting.weight;
            for (let i = 0; i < count; i++) {
                if(Array.isArray(setting.value))
                    weightedList.push(setting.value);
                else 
                    weightedList.push(setting.value + '');
            }
        });
    
        const selectedSettings = new Set();
        while (selectedSettings.size < n && selectedSettings.size < weightedList.length) {
            const randomIndex = Math.floor(Math.random() * weightedList.length);
            const selectedItem = weightedList[randomIndex];
            selectedSettings.add(selectedItem);
        }
    
        return Array.from(selectedSettings).flat() as string[];
    }

    private loadVanilla() {
        return JSON.parse(fs.readFileSync("./custom_weights/rsl_vanilla.json", "utf-8"))
    }

    private loadBeginner() {
        return JSON.parse(fs.readFileSync("./custom_weights/rsl_season7_beginner.json", "utf-8"))
    }

    generateWeights(choices: string[]) {
        const vanilla = this.loadVanilla();
        const beginner = this.loadBeginner();
        for(let choice of choices) {
            const backup = vanilla.weights[choice];
            vanilla.weights[choice] = beginner.weights[choice]
            const cancel_vanilla = Object.entries(backup).filter(([_, value]) => value === 1)[0][0]
            vanilla.weights[choice][cancel_vanilla] = 0
            const allowed = Object.entries(backup).filter(([_, value]) => value as number > 0)
            if(allowed.length === 0) {
                console.error("Impossible to generate: ",  choice)
            }
        }
        return vanilla;
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

    getWeights() {
        return 'setting;weight\n' + settings_allowed.map((setting) => setting.value.toString() + ';' + setting.weight).join('\n')
    }
}