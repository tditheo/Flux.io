const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Expulser un membre.",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à expulser.",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "Raison d'expulsion.",
            required: false
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("membre")
        if(!user) return message.reply("Aucun utilisateur à expulser.")
        let member =  message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun utilisateur à expulser.")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison n'a été fournie"

        if(message.user.id == user.id) return message.reply("Vous ne pouvez pas vous expulser.")
        if((await message.guild.fetchOwner()).id == user.id) return message.reply("Le propriétaire du serveur ne peut pas être expulser.")
        if(member && !member.kickable ) return message.reply("L'utilisateur ne peut pas être expulser.")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("L'utilisateur ne peut pas être expulser.")

        try {await user.send(`Vous avez été expulsé de ${message.guild.name} par ${message.user.tag} pour \`${reason}\`.`)} catch(err) {}
        await message.reply(`${message.user} a expulsé l'utilisateur ${user.tag} pour : \`${reason}\`.`)
        await member.kick(reason)
    }
}