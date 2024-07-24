const Discord = require("discord.js");

module.exports = {

    name: "clear",
    description: "Effacer un certain nombre de messages.",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {
            type: "integer",
            name: "nombre",
            description: "Nombre de messages à effacer.",
            required: true
        }
    ],

    async run(bot, message, args) {
        try {
            const nombre = args.getInteger("nombre");
            
            if (isNaN(nombre) || nombre < 1 || nombre > 100)
                return message.reply("Veuillez fournir un nombre entre 1 et 100.");

            await message.channel.bulkDelete(nombre, true);
            const confirmationMessage = await message.reply(`${nombre} messages ont été effacés.`);
            setTimeout(() => {
                confirmationMessage.delete().catch(console.error);
            }, 2000);
        } catch (err) {
            console.error(err);
            return message.reply(`Une erreur s'est produite lors de la suppression des messages : ${err.message}.`);
        }
    }
};
