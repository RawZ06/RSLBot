const SETTINGS = {
    camc: {
        correct_chest_appearances: "off"
    },
    start_weird_egg: {
        spawn_positions: [],
        shuffle_child_trade: ['Weird Egg'],
        start_with_consumables: false,
        starting_equipment: [],
    },
    keysy: {
        shuffle_smallkeys: "remove"
    },
    open_deku: {
        open_forest: "open"
    },
    gerudo_card: {
        shuffle_gerudo_card: true,
    },
    ocarina: {
        shuffle_ocarinas: true,
        free_scarecrow: true
    },
    bombchu_bag: {
        free_bombchu_drops: true,
    },
    dungeon_er: {
        shuffle_dungeon_entrances: "simple"
    },
    dungeon_er_mixed: {
        shuffle_dungeon_entrances: "simple",
        mix_entrance_pools: ['Interior', 'GrottoGrave', 'Dungeon']
    },
    songsanity: {
        shuffle_song_items: "any"
    },
    songsanity_dungeon: {
        shuffle_song_items: "dungeon"
    },
    cowsanity: {
        shuffle_cows: true
    },
    shops: {
        shopsanity: "4",
        start_with_rupees: true
    },
    scrubsanity: {
        shuffle_scrubs: "low"
    },
    token_dj: {
        tokensanity: "dungeons"
    },
    token_ow: {
        tokensanity: "overworld"
    },
    token_all: {
        tokensanity: "all"
    },
    boss_key: {
        shuffle_bosskeys: "keysanity"
    },
    warps: {
        warp_songs: true,
        owl_drops: true,
    },
    dot: {
        open_door_of_time: false,
    },
    fountain: {
        zora_fountain: "open"
    },
    one_major: {
        one_item_per_dungeon: true,
    },
    boss_souls: {
        shuffle_enemy_spawns: 'bosses'
    },
    regional_souls: {
        shuffle_enemy_spawns: 'regional'
    },
    souls: {
        shuffle_enemy_spawns: 'all'
    },
    triforce: {
        //th 50-100
    },
    boss_er: {
        shuffle_bosses: "full"
    },
    mixed_er: {
        shuffle_grotto_entrances: true,
        shuffle_interior_entrances: "all",
        mix_entrance_pools: ['Interior', 'GrottoGrave']
    },
    keysanity_all: {
        shuffle_smallkeys: 'keysanity'
    },
    keyring_all: {
        shuffle_smallkeys: 'regional',
        key_rings_choice: 'all'
    },
    keyring_regional: {
        shuffle_smallkeys: 'keysanity',
        key_rings_choice: 'all'
    },
    trials: {
        trials_random: true,
    },
    frogs: {
        shuffle_frog_song_rupees: true,
    },
    minimal: {
        item_pool_value: 'minimal'
    },
    scarce: {
        item_pool_value: 'scarce'
    },
    pot: {
        shuffle_pots: 'all',
        shuffle_empty_pots: false
    },
    crate: {
        shuffle_crates: 'all',
        shuffle_empty_crates: false
    },
    beatable_only: {
        reachable_locations: 'beatable'
    },
    bridge_6_med: {
        bridge: 'medallions',
        bridge_medallions: 6,
        shuffle_ganon_bosskey: 'medallions',
        ganon_bosskey_medallions: 6
    },
    bridge_4_med_bgk_6_med: {
        bridge: 'medallions',
        bridge_medallions: 4,
        shuffle_ganon_bosskey: 'medallions',
        ganon_bosskey_medallions: 6
    },
    bridge_4_med_bgk_6_dj: {
        bridge: 'medallions',
        bridge_medallions: 4,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 6
    },
    bridge_5_med_bgk_6_med: {
        bridge: 'medallions',
        bridge_medallions: 5,
        shuffle_ganon_bosskey: 'medallions',
        ganon_bosskey_medallions: 6
    },
    bridge_5_med_bgk_6_dj: {
        bridge: 'medallions',
        bridge_medallions: 5,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 6
    },
    bridge_1_stone: {
        bridge: 'stones',
        bridge_stones: 1,
        shuffle_ganon_bosskey: 'medallions',
        ganon_bosskey_medallions: 6
    },
    bridge_2_stones: {
        bridge: 'stones',
        bridge_stones: 2,
        shuffle_ganon_bosskey: 'medallions',
        ganon_bosskey_medallions: 6
    },
    bridge_3_stones: {
        bridge: 'stones',
        bridge_stones: 3,
        shuffle_ganon_bosskey: 'medallions',
        ganon_bosskey_medallions: 6
    },
    bridge_vanilla: {
        bridge: 'vanilla',
        shuffle_ganon_bosskey: 'medallions',
        ganon_bosskey_medallions: 6
    },
    bridge_5_dj: {
        bridge: 'dungeons',
        bridge_rewards: 5,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 5
    },
    bridge_6_dj: {
        bridge: 'dungeons',
        bridge_rewards: 6,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 6
    },
    bridge_7_dj: {
        bridge: 'dungeons',
        bridge_rewards: 7,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 7
    },
    bridge_8_dj: {
        bridge: 'dungeons',
        bridge_rewards: 8,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 8
    },
    bridge_9_dj: {
        bridge: 'dungeons',
        bridge_rewards: 9,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 9
    },
    precompleted_1: {
        empty_dungeons_mode: 'count',
        empty_dungeons_count: 1,
        enhance_map_compass: true,
        bridge: 'dungeons',
        bridge_rewards: 9,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 9
    },
    precompleted_2: {
        empty_dungeons_mode: 'count',
        empty_dungeons_count: 2,
        enhance_map_compass: true,
        bridge: 'dungeons',
        bridge_rewards: 9,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 9
    },
    precompleted_3: {
        empty_dungeons_mode: 'count',
        empty_dungeons_count: 3,
        enhance_map_compass: true,
        bridge: 'dungeons',
        bridge_rewards: 9,
        shuffle_ganon_bosskey: 'dungeons',
        ganon_bosskey_rewards: 9
    }
}

const INCOMPATIBILITY = [
    ["dungeon_er", "dungeon_er_mixed"],
    ["songsanity", "songsanity_dungeon"],
    ["token_dj", "token_ow", "token_all"],
    ["boss_souls", "regional_souls", "souls"],
    ["keysy", "keysanity_all", "keyring_all", "keyring_regional"],
    ["minimal", "scarce"],
    [
        "bridge_6_med",
        "bridge_4_med_bgk_6_med",
        "bridge_4_med_bgk_6_dj",
        "bridge_5_med_bgk_6_med",
        "bridge_5_med_bgk_6_dj",
        "bridge_1_stone",
        "bridge_2_stones",
        "bridge_3_stones",
        "bridge_vanilla",
        "bridge_5_dj",
        "bridge_6_dj",
        "bridge_7_dj",
        "bridge_8_dj",
        "bridge_9_dj",
        "precompleted_1",
        "precompleted_2",
        "precompleted_3"
    ],
    // ["triforce", "keysanity_all"],
    // ["triforce", "keyring_all"],
    // ["triforce", "boss_souls"],
    // ["triforce", "souls"],
    // ["triforce", "regional_souls"],
    // ["triforce", "keyring_regional"],
    ["triforce", "one_major"],
    // ["one_major", "keysanity_all"],
    // ["one_major", "keyring_regional"],
    // ["one_major", "keyring_all"],
    ["one_major", "souls"],
    ["one_major", "boss_souls"],
    ["one_major", "regional_souls"],
]

const easyList = [
    "camc",
    "start_weird_egg",
    "keysy",
    "open_deku",
    "gerudo_card",
    "ocarina",
    "bombchu_bag",
    "dungeon_er",
    "dungeon_er_mixed",
    "songsanity",
    "songsanity_dungeon",
    "cowsanity",
    "shops",
    "scrubsanity",
    "token_dj",
    "boss_key",
    "warps",
    "dot",
    "fountain",
    "one_major",
    "boss_souls",
    "triforce",
    "boss_er",
    "frogs",
    "bridge_6_med",
    "bridge_4_med_bgk_6_med",
    "bridge_4_med_bgk_6_dj",
    "bridge_5_med_bgk_6_med",
    "bridge_5_med_bgk_6_dj",
    "bridge_1_stone",
    "bridge_2_stones",
    "bridge_3_stones",
    "bridge_vanilla",
    "bridge_5_dj",
    "bridge_6_dj",
    "bridge_7_dj",
    "bridge_8_dj",
    "bridge_9_dj",
    "precompleted_1",
    "precompleted_2",
    "precompleted_3"
  ]

const starting_inventory = [
        "ocarina",
        "farores_wind",
        "lens",
        "zeldas_letter"
];

const triforce_add = {
    one_major: -10,
    keysanity_all: -5,
    keysy: 5,
    token_ow: 5,
    token_all: 5,
    cowsanity: 5,
    shops: 10,
    scrubsanity: 10,
    minimal: 10,
    scarce: 10,
    pot: 15,
    crate: 10,
    boss_souls: -5,
    regional_souls: -10,
    souls: -25
}

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function triforce_hunt(item_pool: 'minimal'|'scarce'|'balanced', settings: string[]) {
    let number_th = 45;
    for(let setting of settings) {
        const value = triforce_add[setting] ?? 0;
        number_th += value;
    }
    const item_pool_multiplier = item_pool === 'minimal' ? 1 : item_pool === 'scarce' ? 1.25 : 1.5
    
    return {
        triforce_hunt: true,
        triforce_goal_per_world: number_th,
        triforce_count_per_world: Math.round(number_th * item_pool_multiplier)
    }
}

function verifyCompatibility(selectedSettings: string[]): boolean {
    for (const group of INCOMPATIBILITY) {
        const found = group.filter(setting => selectedSettings.includes(setting));
        if (found.length > 1) {
            return false; // Incompatibles détectés dans la même sous-liste
        }
    }
    return true; // Aucun conflit détecté
}

export function settingList() {
    return Object.keys(SETTINGS)
}

export function pickCompatibleSettings(count: number, easy = false): string[] {
    const keys = easy ? easyList.slice() : Object.keys(SETTINGS);
    const selected: string[] = [];

    function isCompatible(candidate: string, current: string[]): boolean {
        for (const group of INCOMPATIBILITY) {
            if (group.includes(candidate)) {
                const conflict = current.some(setting => group.includes(setting));
                if (conflict) return false;
            }
        }
        return true;
    }

    let attempts = 0;
    const maxAttempts = 1000;

    while (selected.length < count && attempts < maxAttempts) {
        attempts++;
        const candidate = keys[Math.floor(Math.random() * keys.length)];
        if (!selected.includes(candidate) && isCompatible(candidate, selected)) {
            selected.push(candidate);
        }
    }

    if (selected.length < count) {
        throw new Error(`Could not find ${count} compatible settings after ${maxAttempts} attempts`);
    }

    return selected;
}

export function getSettingsFromChoices(choices: string[], mq = 0) {
    if(!verifyCompatibility(choices)) {
        throw new Error('Two settings are incompatible')
    }
    let settings = {} as Record<string, any>
    const start = [...starting_inventory]
    const item_pool = choices.includes('minimal') ? 'minimal' : choices.includes('scarce') ? 'scarce' : 'balanced';

    for(let choice of choices) {
        if(!SETTINGS[choice]) {
            throw new Error(`Invalid setting ${choice}, please use !franco list to show list`);
        }
        else if(choice === 'triforce') {
            settings = {...settings, ...triforce_hunt(item_pool, choices)}
        } else {
            settings = {...settings, ...SETTINGS[choice]}
        }
    }

    if(choices.includes('dungeon_er_mixed')) {
        settings = {...settings, ...SETTINGS['dungeon_er_mixed']}
    }

    if(choices.includes('start_weird_egg')) {
        start.splice(start.indexOf("zeldas_letter"), 1);
    }

    if(choices.includes('ocarina')) {
        start.splice(start.indexOf("ocarina"), 1)
    }

    settings['starting_inventory'] = start;

  
    if(mq > 0) {
        settings = {...settings, ...{
            mq_dungeons_mode: 'count',
            mq_dungeons_count: mq % 13
        }}
    }

    return settings;
}