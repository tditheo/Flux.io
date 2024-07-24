const Discord = require('discord.js')
const ms = require('ms')

module.exports = {

    name: "unmute",
    description: "Permet de ne plus rendre muet un joueur.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "L'utilisateur à ne plus rendre muet.",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "Raison.",
            required: false
        }
    ],

    async run(bot,message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun utilisateur à ne plus rendre muet")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun utilisateur à ne plus rendre muet.")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie."
        if(!member.moderatable) return message.reply("L'utilisateur ne peut pas être unmute.")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("L'utilisateur ne peut pas être unmute.")
        if(!member.isCommunicationDisabled()) return message.reply("L'utilisateur n'est pas muet.")

        try {await user.send(`Vous n'êtes plus muet sur ${message.guild.name} pour \`${reason}\`.`)} catch(err) {}
        await message.reply(`${message.user} a rendu la parole à l'utilisateur ${user.tag} pour : \`${reason}\`.`)
        await member.timeout(null, reason)
    }
}