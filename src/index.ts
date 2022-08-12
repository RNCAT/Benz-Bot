import 'dotenv/config'
import { Client, BaseInteraction } from 'discord.js'

import config from './config'
import discord from './utils/discord'

const client = new Client({
  intents: config.discord.intents,
})

const clientCommands = discord.getClientCommands()

client.once('ready', () => {
  console.log(clientCommands)
  console.log(`logged in as ${client.user?.tag}`)
})

client.on('error', (error: Error) => {
  console.error(error)
})

client.on('interactionCreate', async (interaction: BaseInteraction) => {
  if (!interaction.isChatInputCommand()) return

  const command = clientCommands.get(interaction.commandName)

  if (!command) return

  try {
    await command.default.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
})

client.login(config.discord.token)
