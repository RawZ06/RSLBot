import { Message } from "discord.js";
import { clearDirectory, generate, lsPatches } from "./execute";

export class SeedGenerator {
    private message: Message;

    constructor(message: Message) {
        this.message = message;
    }

    getWeightMessage(args: string[]): string {
        if (args.length === 0) {
            return "Beginner S6";
        } else if (args[0] === 'th-ban') {
            return "Beginner S6 without Triforce Hunt";
        } else if (args[0] === 'classic') {
            return "Classic S6";
        } else {
            throw new Error(`Type ${args[0]} unknown, please regenerate with th-ban, classic or nothing args`);
        }
    }

    getWeightFile(args: string[]): string | null {
        if (args.length === 0) {
            return "rsl_season6_beginner.json";
        } else if (args[0] === 'th-ban') {
            return "rsl_season6_beginner-th-ban.json";
        } else if (args[0] === 'classic') {
            return null;
        } else {
            this.message.channel.send(`Type ${args[0]} unknown, please regenerate with th-ban, classic or nothing args`);
            throw new Error(`Type ${args[0]} unknown, please regenerate with th-ban, classic or nothing args`);
        }
    }

    async generateSeed(weightFile: string): Promise<string[]> {
        try {
            return await generate(weightFile);
        } catch (err) {
            console.error(err);
            this.message.channel.send("An error occurred to generate a seed");
            return [] as string[];
        }
    }

    async getPatcheFiles(): Promise<string | null> {
        try {
            return await lsPatches();
        } catch (err) {
            console.error(err);
            this.message.channel.send("An error occurred to retrieve patch files");
            return null as string;
        }
    }

    sendFiles(patchFiles: string[], seed: string): void {
        for (const patch of patchFiles) {
            if (patch.includes(seed) && patch.includes("zpf")) {
                this.message.channel.send({files: ["plando-random-settings/patches/" + patch]});
            }
            if (patch.includes(seed) && patch.includes("Spoiler")) {
                this.message.channel.send({
                    files: [{
                        attachment: "plando-random-settings/patches/" + patch,
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
                this.message.channel.send("An error occurred to remove a seed generated");
            }
        }, 1000);
    }
}