const fs = require('fs')
const opening = require('../opening.json')

module.exports = {
  slash: true,
  description: 'เปลี่ยนเพลงเปิดตัว',
  minArgs: 1,
  expectedArgs: '<youtube_url>',
  category: 'Funny',
  callback: async ({ args, interaction }) => {
    const songURL = args[0]
    const userID = interaction.member.user.id

    opening[`${userID}`] = songURL

    fs.writeFileSync('./opening.json', JSON.stringify(opening))

    return ':white_check_mark: พี่เบนซ์เซ็ทเพลงเปิดตัวให้แล้ว !'
  }
}
