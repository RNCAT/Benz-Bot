import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder().setName('cat').setDescription('Random a cat image'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Meow!')
  },
}
