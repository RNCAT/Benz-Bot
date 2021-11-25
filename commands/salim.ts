import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
  category: 'Funny',
  description: 'Random a salim quote.',
  slash: true,

  callback: async () => {
    const embed = new MessageEmbed()

    try {
      const salim = await axios.get(
        'https://watasalim.vercel.app/api/quotes/random'
      )
      const quote: string = salim.data.quote.body

      embed.setTitle('ประโยคสลิ่ม')
      embed.setDescription(quote)
      embed.setColor('YELLOW')
    } catch (error) {
      embed.setColor('RED')
      embed.setDescription('มีข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
    }

    return embed
  },
} as ICommand
