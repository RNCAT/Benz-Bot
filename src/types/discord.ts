import { Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js'

export type CommandsCollection = Collection<string, Command>

export interface Command {
  default: {
    data: SlashCommandBuilder
    execute: (interaction: CommandInteraction) => Promise<unknown>
  }
}
