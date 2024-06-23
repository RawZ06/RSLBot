import {Message} from "discord.js";
import {clearDirectory, generate, lsPatches} from "./execute";

export function executeCommand(message: Message, command: string): void {
    switch (command) {
        case "ping":
            message.channel.send("pong!");
            break;
        case "seed":
            message.channel.send("Seed generating");
            generate("rsl_season6_beginner.json").then(async (result) => {
                lsPatches().then(async (patches) => {
                    const patchFiles = patches.split("\n");
                    if(result.length === 0) {
                        console.error("No seed generated")
                        message.channel.send("No seed generated, please retry or contact RawZ06")
                        return;
                    }
                    const seed = result[0].split(".")[0];
                    for (const patch of patchFiles) {
                        if (patch.includes(seed) && patch.includes("zpf")) {
                            message.channel.send({files: ["plando-random-settings/patches/" + patch]});
                        }
                        if (patch.includes(seed) && patch.includes("Spoiler")) {
                            message.channel.send({
                                files: [{
                                    attachment: "plando-random-settings/patches/" + patch,
                                    name: "SPOILER_" + patch
                                }]
                            });
                        }
                    }
                    setTimeout(async () => await clearDirectory(seed).catch(err => {
                        console.error(err);
                        message.channel.send("An error occurred to remove a seed generated")
                    }), 1000);
                    console.log(`[${new Date().toISOString()}] Seed ${seed} generated`)
                }).catch(err => {
                    console.error(err);
                    message.channel.send("An error occurred to get a seed generated")
                });
            }).catch(err => {
                console.error(err);
                message.channel.send("An error occurred to generate a seed")
            });
            break;
        default:
            message.channel.send("Unknown command");
            break;
    }
}