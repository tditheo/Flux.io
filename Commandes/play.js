const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

let repeat = false;
let currentSong = null;
let audioPlayer = null;

async function playSong(connection, songQuery) {
  const stream = ytdl(songQuery, { filter: 'audioonly' });
  const resource = createAudioResource(stream);

  if (!audioPlayer) {
      audioPlayer = createAudioPlayer();
  }

  audioPlayer.play(resource);
  connection.subscribe(audioPlayer);

  audioPlayer.on('idle', async () => {
      if (repeat) {
          await playSong(connection, songQuery); // Recreate the stream and play again
      } else {
        if (connection.state.status !== 'destroyed') {
            connection.destroy();
        }
      }
  });
}

module.exports = {
    name: 'play',
    description: 'Jouer de la musique depuis YouTube',
    options: [
        {
            name: 'music',
            type: 'string',
            description: "L'URL vers la musique à jouer",
            required: true,
        },
    ],

    async run(bot, interaction, args) {
        const voiceChannel = interaction.member?.voice.channel;

        if (!voiceChannel) {
            return interaction.reply('Vous devez être dans un salon vocal pour utiliser cette commande.');
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        const songQuery = interaction.options.getString('music');

        if (!songQuery) {
            return interaction.reply('Veuillez fournir une URL YouTube de la musique que vous souhaitez jouer.');
        }

        try {
          currentSong = songQuery;
          await playSong(connection, songQuery);
            interaction.reply(`La musique ${songQuery} commence à jouer !`);
        } catch (error) {
            console.error(error);
            interaction.reply('Une erreur s\'est produite lors de la lecture de la musique.');
        }
    },

    setRepeat(value) {
        repeat = value;
    },

    getRepeat() {
        return repeat;
    }
};