import { Message } from "discord.js";
import { clearDirectory, generate, lsPatches } from "./execute";
import { Weight } from "./weights/weight";

export class SeedGenerator {
    private message: Message;

    constructor(message: Message) {
        this.message = message;
    }

    getWeightMessage(args: string[]): string {
        return Weight.getWeightMessage(args[0]);
    }

    getWeightFile(args: string[]): string | null {
        return Weight.getWeightFile(this.message, args[0]);
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