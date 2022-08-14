import axios from 'axios'
import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js'

import config from '../config'

export default {
  data: new SlashCommandBuilder()
    .setName('short')
    .setDescription('URL Shortener')
    .addStringOption((option) =>
      option.setName('url').setDescription('Enter a long URL').setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    try {
      const longURL = interaction.options.getString('url')
      const isURL = longURL?.startsWith('http://') || longURL?.startsWith('https://')

      if (!isURL) throw new Error('URL ไม่ถูกต้อง')

      const { data } = await axios.post(
        config.constants.bitlyURL,
        { long_url: longURL },
        { headers: { Authorization: `Bearer ${config.environments.bitlyToken}` } }
      )

      const embed = new EmbedBuilder()
        .setTitle('URL Shortener')
        .setColor('Green')
        .setImage(data.link)
        .addFields([
          { name: 'Long URL', value: longURL },
          { name: 'Short URL', value: data.link },
        ])

      await interaction.editReply({ content: null, embeds: [embed] })
    } catch (error) {
      if (error instanceof Error) {
        const embed = new EmbedBuilder()
          .setTitle('URL Shortener')
          .setColor('Red')
          .setDescription(error.message)

        await interaction.editReply({ embeds: [embed] })
      }
    }
  },
}
