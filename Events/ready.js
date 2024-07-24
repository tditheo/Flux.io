const Discord = require("discord.js")
const loadSlashCommands = require("../Loaders/loadSlashCommands")
const setStatus = require("./setStatus")

module.exports = async bot => {

    await loadSlashCommands(bot)
    
    console.log(`Connecté en tant que ${bot.user.tag}.`)

    // Appeler la fonction pour définir le statut
    setStatus(bot);
} 