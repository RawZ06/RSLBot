import { Message, TextChannel } from "discord.js";
import { clearDirectory, generate, lsPatches } from "./executeFranco";

export class SeedFrancoGenerator {
    private message: Message;

    constructor(message: Message) {
        this.message = message;
    }

    async generateSeed(): Promise<string[]> {
        try {
            return await generate();
        } catch (err) {
            console.error(err);
            (this.message.channel as TextChannel).send("An error occurred to generate a seed");
            return [] as string[];
        }
    }

    async getPatcheFiles(): Promise<string | null> {
        try {
            return await lsPatches();
        } catch (err) {
            console.error(err);
            (this.message.channel as TextChannel).send("An error occurred to retrieve patch files");
            return null as string;
        }
    }

    sendFiles(patchFiles: string[], seed: string): void {
        for (const patch of patchFiles) {
            if (patch.includes(seed) && patch.includes("zpf")) {
                (this.message.channel as TextChannel).send({files: ["OoT-Randomizer/Output/" + patch]});
            }
            if (patch.includes(seed) && patch.includes("Spoiler")) {
                (this.message.channel as TextChannel).send({
                    files: [{
                        attachment: "OoT-Randomizer/Output/" + patch,
                        name: "SPOILER_" + patch
                    }]
                });
            }
        }
    }

    clear(seed: string): void {
        setTimeout(async () => {
            try {
                await clearDirectory(seed);
            } catch (err) {
                console.error(err);
                (this.message.channel as TextChannel).send("An error occurred to remove a seed generated");
            }
        }, 1000);
    }
}