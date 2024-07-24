// Events/guildMemberAdd.js
const Discord = require('discord.js');
const { ChannelType } = require('discord.js');

module.exports = async function (bot, member, interaction) {

        const welcomeChannel = member.guild.systemChannel;
        if (welcomeChannel && welcomeChannel.type === ChannelType.GuildText) {
            console.log(`Le salon de bienvenue est: ${welcomeChannel.name}`);
            console.log(`Membre ${member.user.tag} rejoint le serveur.`);
            welcomeChannel.send(`Bienvenue à toi ${member.toString()} sur le serveur ${member.guild.name} ! :tada:`);
        } else {
            console.log("Salon de bienvenue non configuré ou incorrect.");
        }
    }