const { CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function handlePollButtons(interaction) {
    const pollId = interaction.customId;

    // Votre logique pour traiter les boutons du sondage ici
    if (pollId === 'poll_yes') {
        await interaction.reply('Vous avez voté Oui!');
    } else if (pollId === 'poll_no') {
        await interaction.reply('Vous avez voté Non!');
    }
}

module.exports = {
    name: 'poll',
    description: 'Créer un sondage.',
    options: [
        {
            name: 'question',
            description: 'La question du sondage.',
            type: 'string',
            required: true,
        },
        {
            name: 'options',
            description: 'Options de réponse, séparés par des virgules.',
            type: 'string',
            required: true,
        },
    ],
    async run(bot, interaction) {
        try {
        const question = interaction.options.getString('question');
        const options = interaction.options.getString('options').split(',');

        console.log('Poll question:', question);
        console.log('Poll options:', options);
    
        const buttonComponents = options.map(option =>
          new ButtonBuilder()
            .setCustomId(`vote_${option.trim()}`)
            .setLabel(option.trim())
            .setStyle(ButtonStyle.Primary)
        );
    
        const row = new ActionRowBuilder().addComponents(buttonComponents);
    
        await interaction.reply({
            content: `Sondage : ${question}`,
            components: [row],
          });
        } catch (error) {
          console.error('Erreur lors de la création du sondage:', error);
          await interaction.reply('Une erreur s\'est produite lors de la création du sondage.');
        }  
      },
    };

    module.exports.handlePollButtons = handlePollButtons;