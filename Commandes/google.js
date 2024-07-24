// google.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'google',
  description: 'Rechercher sur Google.',
  options: [
    {
      name: 'query',
      description: 'La requête de la recherche.',
      type: 'string', // Assurez-vous que le type est en MINUSCULES
      required: true,
    },
  ],
  async run(bot, interaction) {
    const queryOption = interaction.options.getString('query');

    if (!queryOption) {
      return interaction.reply('Veuillez fournir une requête pour rechercher sur Google.');
    }

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(queryOption)}`;

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Voir les résultats')
          .setStyle(ButtonStyle.Link)
          .setURL(googleUrl),
      );

    await interaction.reply({ content: `Voici les résultats de la recherche Google pour "${queryOption}" :`, components: [row] });
  },
};
