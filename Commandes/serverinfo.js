const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'serverinfo',
    description: 'Afficher des informations sur le serveur.',
    dm: false, // N'autorise pas la commande en messages privés

    async run(bot, interaction) {
        try {
            if (!interaction.guild) {
                return interaction.reply('Cette commande doit être exécutée dans un serveur.');
            }

            const guild = interaction.guild;
            const guildName = guild.name;
            const guildId = guild.id;
            const memberCount = guild.memberCount.toString();
            await guild.members.fetch();
            const owner = guild.members.cache.get(guild.ownerId);
            const guildChannels = guild.channels.cache.size.toString();
            const guildDate= guild.createdAt.toUTCString();

            // Créer un embed avec les informations du serveur
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`Informations sur le serveur "${guildName}"`)
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addFields(
                    { name: 'ID du serveur', value: guildId },
                    { name: 'Nom du serveur', value: guild.name },
                    { name: 'Membres', value: memberCount },
                    { name: 'Propriétaire', value: owner.user.tag },
                    { name: 'Nombre de salons', value: guildChannels },
                    { name: 'Date de création', value: guildDate },
                )
                .setFooter({ text: `${guild.name} - Serveur Discord`});

            // Répondre avec l'embed
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur s\'est produite lors de l\'exécution de la commande.');
        }
    },
};
