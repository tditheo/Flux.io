const { AudioPlayerStatus } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'pause',
    description: 'Mettre en pause la musique.',
    async run(bot, interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply("Vous devez être dans un salon vocal pour utiliser cette commande.");
        }

        try {
            const connection = getVoiceConnection(interaction.guild.id); //bot.voice.adapters.get(interaction.guild.id);

            if (!connection || !connection.joinConfig || !connection.joinConfig.channelId || connection.joinConfig.channelId !== voiceChannel.id) {
                console.error('Aucune connexion vocale trouvée ou le bot n\'est pas dans le bon salon vocal.');
                return interaction.reply("Il semble y avoir un problème. Veuillez réessayer plus tard.");
            }

            const subscription = connection.state.subscription;

            const audioPlayer = subscription.player;

            console.log('État de la connexion vocale:', audioPlayer.state.status);

            if (audioPlayer.state.status === AudioPlayerStatus.Playing || audioPlayer.state.status === AudioPlayerStatus.Paused) {
                audioPlayer.pause();
                console.log('La musique a été mise en pause.');
                return interaction.reply("La musique a été mise en pause.");
            } else {
                console.log('Il n\'y a aucune musique en cours de lecture ou le bot n\'est pas dans le bon salon vocal.');
                return interaction.reply("Il n'y a aucune musique en cours de lecture ou le bot n'est pas dans le bon salon vocal.");
            }
        } catch (error) {
            console.error('Erreur lors de la pause de la musique :', error);
            return interaction.reply(`Il semble y avoir une erreur. Détails : ${error.message}`);
        }
    }
};