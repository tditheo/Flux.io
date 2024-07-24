const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'userinfo',
    description: 'Afficher des informations sur un utilisateur.',
    dm: true, // Autorise la commande en messages privés
    options: [
        {
            type: 'user',
            name: 'utilisateur',
            description: 'L\'utilisateur dont vous souhaitez obtenir des informations.',
            required: true,
        },
    ],

    async run(bot, interaction) {
        try {
            // Récupérer l'utilisateur mentionné
            const user = interaction.options.getUser('utilisateur');

            // Vérifier si l'utilisateur est défini
            if (!user) {
                await interaction.reply('Impossible de récupérer les informations sur cet utilisateur.');
                return;
            }

            // Créer un embed pour afficher les informations
            const embed = new EmbedBuilder()
                .setColor('#7289DA')
                .setTitle(`Informations sur ${user.tag}`)
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: 'ID', value: user.id },
                    { name: 'Nom d\'utilisateur', value: user.username },
                    { name: 'Bot', value: user.bot ? 'Oui' : 'Non', inline: true },
                    { name: 'Compte créé le', value: user.createdAt.toUTCString() },
                    { name: 'Discriminateur', value: user.discriminator },
                )
                .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

            // Envoyer l'embed dans le canal
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Une erreur s\'est produite lors de l\'exécution de la commande.');
        }
    },
};
