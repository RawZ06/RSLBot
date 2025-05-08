import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Logger } from '../logger/logger';
import { join } from 'path';

export function init() {
    const projectRoot = process.cwd(); // ← racine du projet (là où tu exécutes `node`)

    const settingsPath = join(projectRoot, 'OoT-Randomizer', 'settings.sav');

    if (existsSync(settingsPath)) {
        Logger.info('✅ settings.sav already exists. Nothing to do.');
        return;
    }

    const presetsPath = join(projectRoot, 'OoT-Randomizer', 'data', 'presets_default.json');
    const presetsRaw = readFileSync(presetsPath, 'utf-8');
    const presets = JSON.parse(presetsRaw);

    const presetData = presets['Franco Tournament S5'];
    if (!presetData) {
        throw new Error('❌ Preset "Franco Tournament S5" not found.');
    }

    const customSettings = {
        rom: join(projectRoot, 'OoT-Randomizer', 'Legend of Zelda, The - Ocarina of Time (USA).z64'),
        create_patch_file: true,
        create_compressed_rom: false,
    };

    const finalSettings = {
        ...presetData,
        ...customSettings,
    };

    writeFileSync(settingsPath, JSON.stringify(finalSettings, null, 4), 'utf-8');
    Logger.info('✅ settings.sav has been created successfully.');
} 