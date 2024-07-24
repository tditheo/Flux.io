const Discord = require("discord.js")

module.exports = {

    name: "ban",
    description: "Bannir un membre.",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Membre à bannir.",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "Raison du bannissement.",
            required: false
        }
    ],

    async run(bot, message, args) {

        try {

            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Aucun utilisateur à bannir.")
            let member =  message.guild.members.cache.get(user.id)

            let reason = args.getString("raison")
            if(!reason) reason = "Aucune raison n'a été fournie."

            if(message.user.id == user.id) return message.reply("Vous ne pouvez pas vous bannir.")
            if((await message.guild.fetchOwner()).id == user.id) return message.reply("Le propriétaire du serveur ne peut pas être banni.")
            if(member && !member.bannable) return message.reply("L'utilisateur ne peut pas être banni.")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("L'utilisateur ne peut pas être banni.")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("L'utilisateur est déjà banni.")

            try {await user.send(`Vous avez été banni de ${message.guild.name} par ${message.user.tag} pour \`${reason}\`.`)} catch(err) {}
            await message.reply(`${message.user} a banni l'utilisateur ${user.tag} pour : \`${reason}\`.`)
            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {

            return message.reply("Aucun utilisateur à bannir .")
        }
        
    }
}