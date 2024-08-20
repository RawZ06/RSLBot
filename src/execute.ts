import { exec } from 'child_process';

export function generate(weight: string): Promise<string[]> {
    // Execute command python3 plando-random-settings/RandomSettingsGenerator.py --override ${weight}
    // This is a placeholder for the actual implementation
    console.log(`Generating settings with weight ${weight ?? 'standard s6'}`);

    const commandLine = weight ? `cd plando-random-settings; python3 RandomSettingsGenerator.py --override weights/${weight}` : 'cd plando-random-settings; python3 RandomSettingsGenerator.py'

    return new Promise(((resolve, reject) => exec(commandLine, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
        }
        // console.log(`stdout generate: ${stdout}`);
        // console.error(`stderr generate: ${stderr}`);
        const files = [
            stdout.split("Creating Patch File: ")[1].split("\n")[0],
            stdout.split("Created spoiler log at: ")[1].split("\n")[0]
        ];
        resolve(files);
    })));
}

export function clearDirectory(seed): Promise<void> {
    return new Promise(((resolve, reject) => exec(`rm -rf plando-random-settings/patches/${seed}*`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
        }
        // console.log(`stdout clearDirectory: ${stdout}`);
        // console.error(`stderr clearDirectory: ${stderr}`);
        resolve();
    })));
}

export function lsPatches(): Promise<string> {
    return new Promise(((resolve, reject) => exec(`ls plando-random-settings/patches`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
        }
        // console.log(`stdout lsPatches: ${stdout}`);
        // console.error(`stderr lsPatches: ${stderr}`);
        resolve(stdout);
    })));
}

export function lsWeights(): Promise<string> {
    return new Promise(((resolve, reject) => exec(`ls custom_weights`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
        }
        // console.log(`stdout lsPatches: ${stdout}`);
        // console.error(`stderr lsPatches: ${stderr}`);
        resolve(stdout);
    })));
}