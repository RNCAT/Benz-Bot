const NSFW = require('discord-nsfw')
const gacha = require('simple-gacha')
const axios = require('axios')
const nsfw = new NSFW()
module.exports = {
  name: 'dogs',
  description: 'random a dog or something wrong XD .',
  category: 'Funny',
  utilisation: '{prefix}dogs',
  async execute(client, message) {
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
    message.channel.send({
      embed: {
        title: isLucky ? null : 'ผิด ๆ ตอนนี้ระบบกำลังบัค โทษทีนะหนุ่ม',
        color: isLucky ? 'GREEN' : 'RED',
        image: {
          url: isLucky
            ? puppyURL.data.message
            : pick.name === 'nekopussy'
            ? await nsfw.nekopussy()
            : await nsfw.pgif(),
        },
      },
    })
    console.log(
      `${message.author.username} use command : dogs and got ${pick.name}`
    )
  },
}
