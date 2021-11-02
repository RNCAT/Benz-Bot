import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
  category: 'Funny',
  description: 'Random a nsfw gif.',
  slash: true,

  callback: async () => {
    const nsfw = await axios.get('https://nekobot.xyz/api/image?type=pgif')

    const embed = new MessageEmbed().setImage(nsfw.data.message)

    return embed
  },
} as ICommand
