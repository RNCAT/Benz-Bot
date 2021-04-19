const fetch = require('node-fetch')
module.exports = {
  name: 'csgo',
  description: 'check player status',
  category: 'Funny',
  utilisation: '{prefix}csgo',
  async execute(client, message, args) {
    const username = args.join(' ')
    const url = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${username}`

    try {
      const csgo = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'TRN-Api-Key': process.env.TRN_KEY,
        },
      })
      const result = await csgo.json()
      const segmentURL = result.data.segments[0].stats
      const player = {
        name: result.data.platformInfo.platformUserHandle,
        timePlayed: segmentURL.timePlayed.displayValue,
        kills: segmentURL.kills.displayValue,
        deaths: segmentURL.deaths.displayValue,
        headshots: segmentURL.headshots.displayValue,
        shotsAccuracy: segmentURL.shotsAccuracy.displayValue,
        bombsPlanted: segmentURL.bombsPlanted.displayValue,
        bombsDefused: segmentURL.bombsDefused.displayValue,
        mvp: segmentURL.mvp.displayValue,
      }
      message.channel.send({
        embed: {
          title: 'CSGO Player Status',
          color: 'GREEN',
          fields: [
            { name: 'ชื่อ', value: player.name, inline: true },
            { name: 'เวลาเล่นทั้งหมด', value: player.timePlayed, inline: true },
            { name: 'ความแม่น', value: player.shotsAccuracy },
            { name: 'Kills', value: player.kills, inline: true },
            { name: 'Deaths', value: player.deaths, inline: true },
            { name: 'Headshots', value: player.headshots, inline: true },
            { name: 'วางระเบิด', value: player.bombsPlanted, inline: true },
            { name: 'กู้ระเบิด', value: player.bombsDefused, inline: true },
            { name: 'MVP', value: player.mvp, inline: true },
          ],
        },
      })
    } catch (error) {
      message.channel.send({
        embed: {
          title: 'ไปตั้ง steam profile เป็นสาธารณะมาก่อน',
          color: 'RED',
          image: {
            url:
              'https://cdn.discordapp.com/attachments/572050130199379979/833727594611736576/unknown.png',
          },
        },
      })
    }

    console.log(`${message.author.username} use command : csgo`)
  },
}
