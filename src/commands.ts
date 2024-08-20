import {Message} from "discord.js";
import { SeedGenerator } from "./generate";
import { Shuffle } from "./shuffle";
import { v4 as uuidv4 } from 'uuid';

async function generator(seedGenerator: SeedGenerator, message: Message, weightFile: string) {
    const result = await seedGenerator.generateSeed(weightFile)
    if(result.length === 0) {
        console.error("No seed generated")
        message.channel.send("No seed generated, please retry or contact RawZ06")
        return;
    }
    const patches = await seedGenerator.getPatcheFiles();
    if(patches === null) {
        console.error("No seed generated")
        message.channel.send("No seed generated, please retry or contact RawZ06")
        return;
    }
    const patchFiles = patches.split("\n");
    const seed = result[0].split(".")[0];
    seedGenerator.sendFiles(patchFiles, seed)
    seedGenerator.clear(seed)
    console.log(`[${new Date().toLocaleString()}] Seed ${seed} with weights ${weightFile ?? 'standard s6'} generated by ${message.author.username}`)
}

export async function executeCommand(message: Message, command: string, args: string[]): Promise<void> {
    const seedGenerator = new SeedGenerator(message);
    switch (command) {
        case "ping":
            message.channel.send("pong!");
            break;
        case "seed":
            const weightFile = seedGenerator.getWeightFile(args);
            const weightMessage = seedGenerator.getWeightMessage(args)
            message.channel.send(`Seed generating with weights ${weightMessage}`);
            generator(seedGenerator, message, weightFile)
            break;
        case "shuffle":
            const shuffle = new Shuffle()
            const elements = args[0] ? parseInt(args[0]) : 5;
            const choices = shuffle.getRandomSettings(elements);
            const weights = shuffle.generateWeights(choices);
            const uuid = uuidv4();
            const filename = "shuffle_" + uuid + ".json"
            shuffle.writeFile(filename, weights)
            message.channel.send("Seed generating with only this settings : || " + choices.toString() + " ||")
            await generator(seedGenerator, message, filename)
            shuffle.rmFile(filename);
        default:
            break;
    }
}