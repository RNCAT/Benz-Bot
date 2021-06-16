require('dotenv').config()
const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: true,
  description: 'ย่อลิงค์',
  minArgs: 1,
  expectedArgs: '<url>',
  callback: async ({ args }) => {
    const longURL = args[0]
    const result = await axios.post(
      'https://api.rebrandly.com/v1/links',
      JSON.stringify({
        destination: longURL,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: process.env.REBRANDLY_TOKEN,
        },
      }
    )
    const { shortUrl } = result.data
    const embed = new MessageEmbed()
      .setColor('GREEN')
      .addField('ลิงค์ที่ย่อ', `https://${shortUrl}`)

    return embed
  },
}
