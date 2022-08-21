import axios from 'axios'
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  TextChannel,
  EmbedBuilder,
} from 'discord.js'
import config from '../config'

export default {
  data: new SlashCommandBuilder().setName('nsfw').setDescription('Random a nsfw gif'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()

    const isTextChannel = interaction.channel instanceof TextChannel
    const embed = new EmbedBuilder().setTitle('NSFW GIF')

    if (!isTextChannel || !interaction.channel.nsfw) {
      embed.setColor('Red')
      embed.setDescription('สามารถใช้ได้เฉพาะ channel NSFW เท่านั้น')
      embed.addFields([
        {
          name: 'วิธีการตั้งค่า',
          value: 'https://bit.ly/discordNSFW',
        },
      ])

      return interaction.editReply({ embeds: [embed] })
    } else {
      const { data } = await axios.get(config.constants.nsfwURL)

      embed.setColor('Green')
      embed.setImage(data.message)

      await interaction.editReply({ embeds: [embed] })
    }
  },
}
