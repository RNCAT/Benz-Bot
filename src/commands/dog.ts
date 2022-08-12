import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder().setName('dog').setDescription('Random a dog image'),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Hong!')
  },
}
