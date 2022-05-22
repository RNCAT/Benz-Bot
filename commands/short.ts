import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
    category: 'Utils',
    description: 'URL Shortener',
    slash: true,
    minArgs: 1,
    expectedArgs: '<url>',

    callback: async ({ args }) => {
        const longURL = args[0]
        const bitlyAPI = 'https://api-ssl.bitly.com/v4/shorten'
        const embed = new MessageEmbed()

        try {
            const shortURL = await axios.post(
                bitlyAPI,
                { long_url: longURL },
                { headers: { Authorization: `Bearer ${process.env.BITLY_APIKEY}` } }
            )

            const { link } = shortURL.data
            embed.setColor('GREEN')
            embed.addField('ลิงก์ที่ย่อ', link)
        } catch (error) {
            embed.setColor('RED')
            embed.setDescription('URL ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง')
        }

        return embed
    },
} as ICommand
