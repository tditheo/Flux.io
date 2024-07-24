const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
  
module.exports = async bot => {

    bot.user.setPresence({
        activities: [{ name: `Flux.io, by @19tdi_theo`, type: ActivityType.Watching}],
        status: 'online',
      });
} 