const playCommand = require('./play.js');

module.exports = {
    name: 'repeat',
    description: 'Activer ou désactiver la répétition de la musique',
    options: [
        {
            type: 'boolean',
            name: 'state',
            description: "Activer ou désactiver la répétition",
            required: true,
        },
    ],

    async run(bot, interaction) {
        const state = interaction.options.getBoolean('state');
        playCommand.setRepeat(state); // Modifier la variable 'repeat' dans play.js

        await interaction.reply(`La répétition est maintenant ${state ? 'activée' : 'désactivée'}.`);
    },
};