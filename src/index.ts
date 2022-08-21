import 'dotenv/config'
import { createServer, IncomingMessage, ServerResponse, Server } from 'http'
import { Client, BaseInteraction } from 'discord.js'

import config from './config'
import discord from './utils/discord'

const client = new Client({ intents: config.discord.intents })
const { clientCommands, clientCommandsJSON } = discord.getClientCommands(config.environments.isProd)

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.end('OK')
})

server.listen(8080, () => {
  console.log('Server is running')
})

client.once('ready', async () => {
  await discord.updateClientCommands(clientCommandsJSON)

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
