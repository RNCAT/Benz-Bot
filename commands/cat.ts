import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
    category: 'Funny',
    description: 'Random a cat image.',
    slash: true,

    callback: async () => {
        const embed = new MessageEmbed()

        try {
            const cat = await axios.get('https://aws.random.cat/meow')
            embed.setColor('GREEN')
            embed.setImage(cat.data.file)
        } catch (error) {
            embed.setColor('RED')
            embed.setDescription('มีข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
        }

        return embed
    },
} as ICommand
