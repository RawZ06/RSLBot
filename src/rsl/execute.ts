import { exec } from 'child_process';
import { Logger } from '../logger/logger';

export function generate(weight: string): Promise<string[]> {
    // Execute command python3 plando-random-settings/RandomSettingsGenerator.py --override ${weight}
    // This is a placeholder for the actual implementation
    Logger.info(`Generating settings with weight ${weight ?? 'standard s7'}`);

    const commandLine = weight ? `cd plando-random-settings; python3 RandomSettingsGenerator.py --override weights/${weight}` : 'cd plando-random-settings; python3 RandomSettingsGenerator.py'

    return new Promise(((resolve, reject) => exec(commandLine, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
        }
        const files = [
            stdout.split("Creating Patch File: ")[1]?.split("\n")[0],
            stdout.split("Created spoiler log at: ")[1]?.split("\n")[0]
        ];
        if(files.filter(e => e).length === 2)
            resolve(files);
        else reject(stdout)
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