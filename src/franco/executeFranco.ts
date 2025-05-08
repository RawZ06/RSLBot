import { exec } from 'child_process';
import { Logger } from '../logger/logger';

export function generate(): Promise<string[]> {
    Logger.info(`Generating settings Franco`);

    const commandLine = `cd OoT-Randomizer; python3 -u OoTRandomizer.py`

    return new Promise(((resolve, reject) => exec(commandLine, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
        }
        const files = [
            stderr.split("Creating Patch File: ")[1]?.split("\n")[0],
            stderr.split("Created spoiler log at: ")[1]?.split("\n")[0]
        ];
        Logger.info(files);
        if(files.filter(e => e).length === 2)
            resolve(files);
        else reject(stderr)
    })));
}

export function clearDirectory(seed): Promise<void> {
    return new Promise(((resolve, reject) => exec(`rm -rf OoT-Randomizer/Output/${seed}*`, (error, stdout, stderr) => {
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
    return new Promise(((resolve, reject) => exec(`ls OoT-Randomizer/Output`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject(error);
        }
        // console.log(`stdout lsPatches: ${stdout}`);
        // console.error(`stderr lsPatches: ${stderr}`);
        resolve(stdout);
    })));
}