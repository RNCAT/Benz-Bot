import { Collection, REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import path from 'node:path'
import fs from 'node:fs'

import { CommandsCollection, Command } from '../types/discord'
import config from '../config'

function getClientCommands(isProd: boolean): {
  clientCommands: CommandsCollection
  clientCommandsJSON: RESTPostAPIApplicationCommandsJSONBody[]
} {
  const extensionName = isProd ? '.js' : '.ts'

  const clientCommands: CommandsCollection = new Collection()
  const clientCommandsJSON = []
  const commandsPath = path.join(__dirname, '../commands/')
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(extensionName))

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command: Command = require(filePath)

    clientCommands.set(command.default.data.name, command)
    clientCommandsJSON.push(command.default.data.toJSON())
  }

  return { clientCommands, clientCommandsJSON }
}

async function updateClientCommands(commands: RESTPostAPIApplicationCommandsJSONBody[]) {
  const rest = new REST({ version: '10' }).setToken(config.discord.token)

  try {
    await rest.put(Routes.applicationCommands(config.discord.appId), { body: commands })

    console.log('Successfully registered application commands.')
  } catch (error) {
    console.error(error)
  }
}

export default { getClientCommands, updateClientCommands }
