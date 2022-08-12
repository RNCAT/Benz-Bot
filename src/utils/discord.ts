import { Collection } from 'discord.js'
import path from 'node:path'
import fs from 'node:fs'
import { CommandsCollection, Command } from '../types/discord'

function getClientCommands(isProd: boolean): CommandsCollection {
  const extensionName = isProd ? '.js' : '.ts'

  const clientCommands: CommandsCollection = new Collection()
  const commandsPath = path.join(__dirname, '../commands/')
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(extensionName))

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command: Command = require(filePath)

    clientCommands.set(command.default.data.name, command)
  }

  return clientCommands
}

export default { getClientCommands }
