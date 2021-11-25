import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
    category: 'Funny',
    description: 'Random a dog image.',
    slash: true,

    callback: async () => {
        const embed = new MessageEmbed()

        try {
            const dog = await axios.get('https://dog.ceo/api/breeds/image/random')
            embed.setColor('GREEN')
            embed.setImage(dog.data.message)
        } catch (error) {
            embed.setColor('RED')
            embed.setDescription('มีข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')

            return embed
        }

        return embed
    },
} as ICommand
