module.exports = {
    name: 'help',
    description: 'Affiche la liste de toutes les commandes disponibles.',
    async run(bot, interaction) {
        const commands = bot.commands.map(cmd => `\`${cmd.name}\`: ${cmd.description}`).join('\n');

        try {
            await interaction.user.send(`Voici la liste des commandes disponibles :\n\n${commands}`);
            await interaction.reply({ content: 'La liste des commandes vous a été envoyée en message privé.', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Je n\'ai pas pu vous envoyer la liste des commandes en message privé. Veuillez vérifier vos paramètres de confidentialité.', ephemeral: true });
        }
    },
};