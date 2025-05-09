import { exec, spawn } from 'child_process';
import { Logger } from '../logger/logger';
import { getPreset } from './preset';

export function generate(settings: Record<string, any> = {}): Promise<string[]> {
    Logger.info(`Generating seed with settings Franco`);

    const command = 'python3';
    const args = ['-u', 'OoTRandomizer.py', '--settings=-'];
    const allsettings = {...getPreset(), ...settings}

    return new Promise((resolve, reject) => {
        const process = spawn(command, args, {
            cwd: 'OoT-Randomizer', // Pour que le script se lance dans le bon dossier
        });

        let stderr = '';
        let stdout = '';

        process.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        process.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        process.on('error', (err) => {
            reject(err);
        });

        process.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Process exited with code ${code}\n${stderr}`));
            }

            const files = [
                stderr.split("Creating Patch File: ")[1]?.split("\n")[0],
                stderr.split("Created spoiler log at: ")[1]?.split("\n")[0]
            ];

            Logger.info(files);

            if (files.filter(e => e).length === 2) {
                resolve(files);
            } else {
                reject(stderr);
            }
        });

        // Envoi des settings en JSON via stdin
        if (allsettings) {
            process.stdin.write(JSON.stringify(allsettings));
        }
        process.stdin.end(); // Toujours fermer le flux
    });
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