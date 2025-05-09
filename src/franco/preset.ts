import { readFileSync } from 'fs';
import { join } from 'path';

export function getPreset() {
    const projectRoot = process.cwd();

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

    return {
        ...customSettings,
        ...presetData,
    };
} 