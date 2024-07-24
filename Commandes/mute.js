const Discord = require('discord.js')
const ms = require('ms')

module.exports = {

    name: "mute",
    description: "Permet de rendre muet un joueur.",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "L'utilisateur à rendre muet.",
            required: true
        }, {
            type: "string",
            name: "durée",
            description: "Temps de silence.",
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
        if(!user) return message.reply("Aucun utilisateur à rendre muet.")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Aucun utilisateur à rendre muet.")

        let time = args.getString("durée")
        if(!time) return message.reply("Pas de durée fournie.")
        if(isNaN(ms(time))) return message.reply("Durée invalide.")
        if(ms(time) > 2419200000) return message.reply("La durée ne peut pas excéder 28 jours.")

        let reason = args.getString("raison")
        if(!reason) reason = "Aucune raison fournie."

        if(message.user.id === user.id) return message.reply("Vous ne pouvez vous rendre muet.")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Le propriétaire du serveur ne peut pas être rendu muet.")
        if(!member.moderatable) return message.reply("L'utilisateur ne peut pas être rendu muet.")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("L'utilisateur ne peut pas être rendu muet.")
        if(member.isCommunicationDisabled()) return message.reply("L'utilisateur est déjà muet.")

        try {await user.send(`Vous avez été rendu muet de ${message.guild.name} par ${message.user.tag} pendant ${time} pour \`${reason}\`.`)} catch(err) {}
        await message.reply(`${message.user} a rendu muet l'utilisateur ${user.tag} pendant ${time} pour : \`${reason}\`.`)
        await member.timeout(ms(time), reason)
    }
}