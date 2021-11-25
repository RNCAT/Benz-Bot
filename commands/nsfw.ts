import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
    category: 'Funny',
    description: 'Random a nsfw gif.',
    slash: true,

    callback: async ({ channel }) => {
        const embed = new MessageEmbed()

        if (!channel.nsfw) {
            embed.setColor('RED')
            embed.setDescription('คำสั่งอนุญาตให้ใช้เฉพาะ channel NSFW เท่านั้น')

            return embed
        }

        try {
            const nsfw = await axios.get('https://nekobot.xyz/api/image?type=pgif')
            embed.setColor('GREEN')
            embed.setImage(nsfw.data.message)
        } catch (error) {
            embed.setColor('RED')
            embed.setDescription('มีข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')

            return embed
        }

        return embed
    },
} as ICommand
