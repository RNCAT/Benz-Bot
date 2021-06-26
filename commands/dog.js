const axios = require('axios')
const NSFW = require('discord-nsfw')
const gacha = require('simple-gacha')
const nsfw = new NSFW()
const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: true,
  description: 'สุ่มรูปหมา',
  callback: async () => {
    const lootTable = [
      {
        name: 'puppy',
        weight: 3,
      },
      {
        name: 'nekopussy',
        weight: 1,
      },
      {
        name: 'pgif',
        weight: 1,
      },
    ]
    const { pick } = await gacha.simple(lootTable)
    let isLucky = pick.name === 'puppy'
    const puppyURL = await axios.get(`https://dog.ceo/api/breeds/image/random`)
    const image = isLucky
      ? puppyURL.data.message
      : pick.name === 'nekopussy'
      ? await nsfw.nekopussy()
      : await nsfw.pgif()

    const embed = new MessageEmbed()
      .setTitle(isLucky ? '' : 'ผิด ๆ ตอนนี้ระบบกำลังบัค โทษทีนะหนุ่ม')
      .setColor(isLucky ? 'GREEN' : 'RED')
      .setImage(image)

    return embed
  },
}
