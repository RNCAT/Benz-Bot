import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
  category: 'Funny',
  description: 'Random a salim quote.',
  slash: true,
  testOnly: true,

  callback: async () => {
    const salim = await axios.get(
      'https://watasalim.vercel.app/api/quotes/random'
    )
    const quote: string = salim.data.quote.body

    const embed = new MessageEmbed()
      .setTitle('ประโยคสลิ่ม')
      .setDescription(quote)
      .setColor('YELLOW')

    return embed
  },
} as ICommand
