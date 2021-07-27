const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: true,
  description: 'สุ่มประโยคสลิ่ม',
  category: 'Funny',
  callback: async () => {
    const salim = await axios.get(
      'https://watasalim.vercel.app/api/quotes/random'
    )
    const { body } = salim.data.quote

    const embed = new MessageEmbed()
      .setTitle('ประโยคสลิ่ม')
      .setColor('YELLOW')
      .setDescription(body)

    return embed
  }
}
