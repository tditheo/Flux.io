const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config")


bot.commands = new Discord.Collection()

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)

// Discord Bot created by @19tdi_theo with the help of Mad Rage's Tutorials and OpenAI ChatGPT 3.5