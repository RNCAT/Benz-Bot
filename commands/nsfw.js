const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: true,
  description: 'random a nsfw image.',
  category: 'Funny',
  callback: async () => {
    const URL = 'https://nekobot.xyz/api/image?type=pgif'

    const nsfw = async () => {
      const { data } = await axios.get(URL)
      return data.message
    }

    const title = ''
    const image = await nsfw()
    const color = 'GREEN'

    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor(color)
      .setImage(image)

    return embed
  }
}
