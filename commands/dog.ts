import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
  category: 'Funny',
  description: 'Random a dog image.',
  slash: true,

  callback: async () => {
    const dog = await axios.get('https://dog.ceo/api/breeds/image/random')

    const embed = new MessageEmbed().setImage(dog.data.message)

    return embed
  },
} as ICommand
