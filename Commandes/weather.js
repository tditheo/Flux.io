const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'weather',
    description: 'Afficher les informations météorologiques',
    options: [
        {
            name: 'ville',
            description: 'Préciser une ville.',
            type: 'string',
            required: true,
        },
    ],
    async run(bot, interaction, options) {
        // Récupérer l'argument 'ville' depuis l'interaction
        const city = options.getString('ville');

        // Votre clé API OpenWeatherMap
        const apiKey = 'a8de69a308eaf20e63d88d701ed7e1a0';

        // Vérifier si la ville est spécifiée
        if (!city) {
            return interaction.reply('Veuillez spécifier une ville.');
        }

        try {
            // Faire une requête à l'API OpenWeatherMap
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    appid: apiKey,
                },
            });

            // Extraire les informations météorologiques de la réponse
            const weatherData = response.data;

            const codeMeteo = weatherData.weather[0].icon
            const traductionsMeteo = {
                "01d": "Ciel dégagé (jour)",
                "01n": "Ciel dégagé (nuit)",
                "02d": "Quelques nuages (jour)",
                "02n": "Quelques nuages (nuit)",
                "03d": "Nuages ​​dispersés (jour)",
                "03n": "Nuages ​​dispersés (nuit)",
                "04d": "Nuages couverts (jour)",
                "04n": "Nuages couverts (nuit)",
                "09d": "Averses de pluie",
                "10d": "Temps pluvieux",
                "11d": "Temps orageux",
                "13d": "Neige",
            };

            function traduireTemps(codeMeteo) {
                // Si le code météo est présent dans l'objet de correspondance, retournez la traduction, sinon retournez un message par défaut
                return traductionsMeteo[codeMeteo] || "Code météo non reconnu";
            }
            
            let tempCelsius = weatherData.main.temp - 273.15;
            let roundedTempCelsius = Math.round(tempCelsius);

            let tempsTraduit = traduireTemps(codeMeteo)

            // Construire un message Embed
            const embed = new EmbedBuilder()
                .setTitle(`Conditions météorologiques pour ${weatherData.name}`)
                .addFields(
                { name: 'Température', value: `${roundedTempCelsius} °C`, inline: true },
                { name: 'Temps', value: tempsTraduit, inline: true },
                { name: 'Humidité', value: `${weatherData.main.humidity}%`, inline: true },
                )
                .setDescription(`Source : [OpenWeatherMap](https://openweathermap.org/)`);

            // Envoyer le message Embed
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            interaction.reply('Une erreur s\'est produite lors de la récupération des informations météorologiques.');
        }
    },
};
