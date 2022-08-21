import axios from 'axios'
import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js'

import config from '../config'

export default {
  data: new SlashCommandBuilder().setName('dog').setDescription('Random a dog image'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    const { data } = await axios.get(config.constants.dogURL)

    const embed = new EmbedBuilder().setColor('Green').setImage(data.message)

    await interaction.editReply({ embeds: [embed] })
  },
}
