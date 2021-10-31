import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
  category: 'Funny',
  description: 'Random a cat image.',
  slash: true,
  testOnly: true,

  callback: async () => {
    const cat = await axios.get('https://aws.random.cat/meow')

    const embed = new MessageEmbed().setImage(cat.data.file)

    return embed
  },
} as ICommand
