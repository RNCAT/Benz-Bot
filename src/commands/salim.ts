import axios from 'axios'
import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js'

import config from '../config'

export default {
  data: new SlashCommandBuilder().setName('salim').setDescription('Random a salim quote.'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    try {
      const { data } = await axios.get(config.constants.salimURL)
      const quote: string = data.quote.body

      const embed = new EmbedBuilder()
        .setTitle('Salim Quote')
        .setColor('Yellow')
        .setDescription(quote)

      await interaction.editReply({ embeds: [embed] })
    } catch (error) {
      const embed = new EmbedBuilder()
        .setColor('Red')
        .setDescription('มีข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')

      await interaction.editReply({ embeds: [embed] })
    }
  },
}
