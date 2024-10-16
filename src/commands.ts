import { AttachmentBuilder, Message } from "discord.js";
import { SeedGenerator } from "./generate";
import * as Shuffle from "./shuffle";
import * as CustomSeed from "./custom"
import { v4 as uuidv4 } from 'uuid';
import { Logger } from "./logger/logger";
import * as fs from 'fs'
const helpMessageCS = fs.readFileSync("./data/help-cs.txt", "utf-8")

async function generator(seedGenerator: SeedGenerator, message: Message, weightFile: string, sendWeightFile = false) {
    const result = await seedGenerator.generateSeed(weightFile)
    if (result.length === 0) {
        console.error("No seed generated")
        message.channel.send("No seed generated, please retry or contact RawZ06")
        return;
    }
    const patches = await seedGenerator.getPatcheFiles();
    if (patches === null) {
        console.error("No seed generated")
        message.channel.send("No seed generated, please retry or contact RawZ06")
        return;
    }
    const patchFiles = patches.split("\n");
    const seed = result[0].split(".")[0];
    seedGenerator.sendFiles(patchFiles, seed)
    seedGenerator.clear(seed)
    Logger.info(`Seed ${seed} with weights ${weightFile ?? 'standard s7'} generated by ${message.author.username}`)
}

export async function executeCommand(message: Message, command: string, args: string[]): Promise<void> {
    const seedGenerator = new SeedGenerator(message);
    switch (command) {
        case "ping":
            message.channel.send("pong!");
            break;
        case "seed":
            try {
                const weightFile = seedGenerator.getWeightFile(args);
                const weightMessage = seedGenerator.getWeightMessage(args)
                const deprecated = seedGenerator.getDeprecated(args);
                if(deprecated) {
                    message.channel.send(`This command with ${weightMessage} is deprecated, please use !customseed instead to ban settings`);
                }
                message.channel.send(`Seed generating with weights ${weightMessage}`);
                generator(seedGenerator, message, weightFile)
            } catch (e) {
                message.channel.send(e.toString())
            }
            break;
        case "shuffle":
            try {
                const shuffle = new Shuffle.Shuffle()
                const { count, noOutput, weight } = Shuffle.parseArguments(args);
                if (weight) {
                    const attachmentBuilder = new AttachmentBuilder(Buffer.from(shuffle.getWeights(), 'utf-8'), { name: 'weights.csv' });
                    message.channel.send({ files: [attachmentBuilder] });
                    return;
                }
                const choices = shuffle.getRandomSettings(count);
                if (choices === null) {
                    message.channel.send("Impossible to generate more than 57 settings, aborted")
                    return;
                }
                message.channel.send("Seed generating with only this settings : || " + choices.toString() + " ||")
                if (!noOutput) {
                    const weights = shuffle.generateWeights(choices);
                    const uuid = uuidv4();
                    const filename = "shuffle_" + uuid + ".json"
                    shuffle.writeFile(filename, weights)
                    await generator(seedGenerator, message, filename, true)
                    shuffle.rmFile(filename);
                } else {
                    message.channel.send("Seed no generated, because no-output is on")
                }
            } catch (e) {
                message.channel.send(e.toString())
            }
        case "customseed":
            try {
                const custom = new CustomSeed.CustomSeed()
                const { typeSeed, ban, list, help: helpCS } = CustomSeed.parseArguments(args);
                if(list) {
                    message.channel.send({
                        files: [{
                            attachment: "data/allsettings.json",
                            name: "settings_custom.json"
                        }]
                    });
                    return;
                }
                if(helpCS) {
                    message.channel.send(helpMessageCS);
                    return;
                }
                const banned = custom.getRandomSettings(ban);
                message.channel.send("Seed generating without : " + banned.toString())
                const weights = custom.generateWeights(message, typeSeed, banned);
                const uuid = uuidv4();
                const filename = "custom_" + uuid + ".json"
                custom.writeFile(filename, weights)
                await generator(seedGenerator, message, filename, true)
                custom.rmFile(filename);
            } catch (e) {
                message.channel.send(e.toString())
            }
        default:
            break;
    }
}