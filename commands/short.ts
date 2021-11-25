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
        const embed = new MessageEmbed()

        try {
            const shortURL = await axios.post(
                'https://api.rebrandly.com/v1/links',
                {
                    destination: longURL,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        apikey: String(process.env.REBRANDLY_TOKEN),
                    },
                }
            )

            const { shortUrl } = shortURL.data
            embed.setColor('GREEN')
            embed.addField('ลิงก์ที่ย่อ', `https://${shortUrl}`)
        } catch (error) {
            embed.setColor('RED')
            embed.setDescription('URL ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง')
        }

        return embed
    },
} as ICommand
