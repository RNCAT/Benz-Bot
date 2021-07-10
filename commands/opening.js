const fs = require('fs')
module.exports = {
  slash: true,
  description: 'เปลี่ยนเพลงเปิดตัว',
  minArgs: 1,
  expectedArgs: '<youtube_url>',
  callback: async ({ args, interaction }) => {
    const songURL = args[0]
    const userID = interaction.member.user.id
    const opening = fs.readFileSync('./opening.json', 'utf-8')

    const openingData = JSON.parse(opening)

    openingData[`${userID}`] = songURL

    fs.writeFileSync('./opening.json', JSON.stringify(openingData))

    return ':white_check_mark: พี่เบนซ์เซ็ทเพลงเปิดตัวให้แล้ว !'
  }
}
