const axios = require('axios')
const NSFW = require('discord-nsfw')
const gacha = require('simple-gacha')
const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: true,
  description: 'สุ่มรูปหมา',
  callback: async () => {
    const lootTable = [
      {
        name: 'puppy',
        weight: 2,
      },
      {
        name: 'pgif',
        weight: 1,
      },
    ]
    const dogURL = `https://dog.ceo/api/breeds/image/random`
    const nsfw = new NSFW()
    const { pick } = await gacha.simple(lootTable)
    const isLucky = pick.name === 'puppy'

    const puppy = async () => {
      const { data } = await axios.get(dogURL)
      return data.message
    }

    const title = isLucky ? '' : 'ผิด ๆ ตอนนี้ระบบกำลังบัค โทษทีนะหนุ่ม'
    const image = isLucky ? puppy() : nsfw.pgif()
    const color = isLucky ? 'GREEN' : 'RED'

    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor(color)
      .setImage(image)

    return embed
  },
}
