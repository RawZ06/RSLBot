const settings_allowed = [
    {
        "value": "shuffle_tcgkeys",
        "weight": 3
    },
    {
        "value": "shuffle_silver_rupees",
        "weight": 3
    },
    {
        "value": "free_bombchu_drops",
        "weight": 2
    },
    {
        "value": "adult_trade_shuffle",
        "weight": 2
    },
    {
        "value": "open_forest",
        "weight": 3
    },
    {
        "value": "open_kakariko",
        "weight": 2
    },
    {
        "value": "open_door_of_time",
        "weight": 3
    },
    {
        "value": "zora_fountain",
        "weight": 3
    },
    {
        "value": "gerudo_fortress",
        "weight": 3
    },
    {
        "value": [
            "bridge",
            "bridge_medallions",
            "bridge_stones",
            "bridge_rewards"
        ],
        "weight": 4
    },
    {
        "value": "triforce_hunt",
        "weight": 1
    },
    {
        "value": "trials",
        "weight": 4
    },
    {
        "value": "shuffle_interior_entrances",
        "weight": 3
    },
    {
        "value": "shuffle_grotto_entrances",
        "weight": 3
    },
    {
        "value": "shuffle_dungeon_entrances",
        "weight": 3
    },
    {
        "value": "shuffle_bosses",
        "weight": 3
    },
    {
        "value": "owl_drops",
        "weight": 2
    },
    {
        "value": "warp_songs",
        "weight": 3
    },
    {
        "value": "dungeon_shortcuts_choice",
        "weight": 2
    },
    {
        "value": "key_rings_choice",
        "weight": 2
    },
    {
        "value": [
            "shopsanity",
            "shopsanity_prices"
        ],
        "weight": 3
    },
    {
        "value": "tokensanity",
        "weight": 4
    },
    {
        "value": "shuffle_scrubs",
        "weight": 4
    },
    {
        "value": "shuffle_cows",
        "weight": 4
    },
    {
        "value": "shuffle_song_items",
        "weight": 4
    },
    {
        "value": "shuffle_kokiri_sword",
        "weight": 2
    },
    {
        "value": "shuffle_ocarinas",
        "weight": 3
    },
    {
        "value": "shuffle_gerudo_card",
        "weight": 2
    },
    {
        "value": "shuffle_beans",
        "weight": 2
    },
    {
        "value": "shuffle_expensive_merchants",
        "weight": 2
    },
    {
        "value": "shuffle_frog_song_rupees",
        "weight": 2
    },
    {
        "value": "shuffle_mapcompass",
        "weight": 2
    },
    {
        "value": "shuffle_smallkeys",
        "weight": 4
    },
    {
        "value": "shuffle_bosskeys",
        "weight": 4
    },
    {
        "value": [
            "shuffle_ganon_bosskey",
            "ganon_bosskey_medallions",
            "ganon_bosskey_stones"
        ],
        "weight": 4
    },
    {
        "value": "enhance_map_compass",
        "weight": 2
    },
    {
        "value": "reachable_locations",
        "weight": 3
    },
    {
        "value": "no_escape_sequence",
        "weight": 1
    },
    {
        "value": "no_epona_race",
        "weight": 1
    },
    {
        "value": "free_scarecrow",
        "weight": 4
    },
    {
        "value": "complete_mask_quest",
        "weight": 1
    },
    {
        "value": "plant_beans",
        "weight": 2
    },
    {
        "value": "big_poe_count",
        "weight": 1
    },
    {
        "value": "correct_chest_appearances",
        "weight": 4
    },
    {
        "value": "blue_fire_arrows",
        "weight": 1
    },
    {
        "value": "text_shuffle",
        "weight": 1
    },
    {
        "value": "damage_multiplier",
        "weight": 1
    },
    {
        "value": "deadly_bonks",
        "weight": 1
    },
    {
        "value": "starting_tod",
        "weight": 1
    },
    {
        "value": "item_pool_value",
        "weight": 4
    },
    {
        "value": "junk_ice_traps",
        "weight": 1
    },
    {
        "value": "ice_trap_appearance",
        "weight": 1
    },
    {
        "value": "start_with_consumables",
        "weight": 1
    },
    {
        "value": "start_with_rupees",
        "weight": 1
    },
    {
        "value": "starting_hearts",
        "weight": 1
    },
    {
        "value": "key_appearance_match_dungeon",
        "weight": 1
    },
    {
        "value": "ruto_already_f1_jabu",
        "weight": 1
    }
]

import * as fs from 'fs'

export class Shuffle {
    getRandomSettings(n) {
        if(n > settings_allowed) {
            return null;
        }
        const weightedList = [] as Array<string|string[]>;
        settings_allowed.forEach(setting => {
            const count = setting.weight;
            for (let i = 0; i < count; i++) {
                weightedList.push(setting.value);
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
        return JSON.parse(fs.readFileSync("./custom_weights/rsl_season6_beginner.json", "utf-8"))
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
}