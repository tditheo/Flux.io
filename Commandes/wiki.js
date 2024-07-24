// wiki.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'wiki',
  description: 'Rechercher sur Wikipedia.',
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
      return interaction.reply('Veuillez fournir une requête pour rechercher sur Wikipedia.');
    }

    const wikiUrl = `https://fr.wikipedia.org/wiki/${encodeURIComponent(queryOption)}`;

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Voir les résultats')
          .setStyle(ButtonStyle.Link)
          .setURL(wikiUrl),
      );

    await interaction.reply({ content: `Voici les résultats de la recherche Wikipedia pour "${queryOption}" :`, components: [row] });
  },
};
