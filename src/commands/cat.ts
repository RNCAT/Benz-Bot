import axios from 'axios'
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

import config from '../config'

export default {
  data: new SlashCommandBuilder().setName('cat').setDescription('Random a cat image'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    const { data } = await axios.get(config.constants.catURL)

    const embed = new EmbedBuilder().setColor('Green').setImage(data.file)

    await interaction.editReply({ embeds: [embed] })
  },
}
