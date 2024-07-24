const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'stop',
    description: 'Arrêter la musique actuelle.',
    async run(bot, interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply("Vous devez être dans un salon vocal pour utiliser cette commande.");
        }

        const connection = getVoiceConnection(interaction.guild.id);

        if (connection && connection.joinConfig.channelId === voiceChannel.id) {
            connection.destroy(); // Détruit la connexion vocale
            return interaction.reply("La musique a été arrêtée avec succès, et le bot a quitté le salon vocal.");
        } else {
            return interaction.reply("Il n'y a aucune musique en cours de lecture.");
        }
    }
};
