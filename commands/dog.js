const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: true,
  description: 'สุ่มรูปหมา',
  category: 'Funny',
  callback: async () => {
    const dogURL = 'https://dog.ceo/api/breeds/image/random'
    const nsfwURL = 'https://nekobot.xyz/api/image?type=pussy'

    const puppy = async () => {
      const { data } = await axios.get(dogURL)
      return data.message
    }

    const nsfw = async () => {
      const { data } = await axios.get(nsfwURL)
      return data.message
    }

    const isLucky = Math.floor(Math.random() * 3) === 0

    const title = isLucky ? 'ผิด ๆ ตอนนี้ระบบกำลังบัค โทษทีนะหนุ่ม' : ''
    const image = isLucky ? await nsfw() : await puppy()
    const color = isLucky ? 'RED' : 'GREEN'

    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor(color)
      .setImage(image)

    return embed
  }
}
