const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js");

module.exports = {

    name: "createembed",
    description: "Créer un message embed.",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    options: [
        {
            type: "string",
            name: "titre",
            description: "Le titre de l'embed.",
            required: true
        },
        {
            type: "string",
            name: "description",
            description: "La description de l'embed.",
            required: false
        },
        {
            type: "string",
            name: "couleur",
            description: "La couleur de l'embed en format hexadécimal (facultatif).",
            required: false
        }
    ],

    async run(bot, message, args) {
        try {
            const embed = new EmbedBuilder()
                .setTitle('**OBJECTIFS DE LA SEMAINE (du 19.02 au 25.02)**')
                .setDescription('- Mineur et Farmeur Niv. 20, Hunter Niv. 15, Alchimiste Niv. 10 (__**pour Théo et Lilian**__) \n- Tous les métiers Niv. 12 (pour tout le monde) \n- Avancer sur le clicker \n- Créer la faction In-Game \n- Déménager la base (le stuff)')
                .setColor('#1675EE');

            await message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            return message.reply(`Une erreur s'est produite lors de la création de l'embed : ${err.message}.`);
        }
    }
};
