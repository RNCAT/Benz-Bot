import { GatewayIntentBits } from 'discord.js'

const discord = {
  token: process.env.DISCORD_TOKEN || '',
  appId: process.env.DISCORD_APP_ID || '996036488099803258',
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}

export default discord
