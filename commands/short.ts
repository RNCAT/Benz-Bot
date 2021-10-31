import { ICommand } from 'wokcommands'
import { MessageEmbed } from 'discord.js'
import axios from 'axios'

export default {
  category: 'Utils',
  description: 'URL Shortener',
  slash: true,
  testOnly: true,
  minArgs: 1,
  expectedArgs: '<url>',

  callback: async ({ args }) => {
    const longURL = args[0]

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
    const embed = new MessageEmbed()
      .setColor('GREEN')
      .addField('ลิงก์ที่ย่อ', `https://${shortUrl}`)

    return embed
  },
} as ICommand
